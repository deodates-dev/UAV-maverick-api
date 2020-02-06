import asyncio
import logging
import time
import re

import tornado.ioloop

application_log = logging.getLogger("tornado.application")


class ProcessRunner(object):
    def __init__(
        self,
        cmd,
        loop=tornado.ioloop.IOLoop.current(),
        started_callback=None,
        output_callback=None,
        complete_callback=None,
        read_timeout=2.0,
        post_timeout=0,
    ):
        self.cmd = cmd
        self.loop = loop
        self.started_callback = started_callback
        self.output_callback = output_callback
        self.complete_callback = complete_callback
        self.read_timeout = read_timeout
        self.post_timeout = post_timeout
        self.process = None
        self.complete = False
        self.returncode = None
        self.running = False
        self.start_time = None
        self.stdout = ""
        self.stderror = ""
        self.stdout_log = []
        self.stderror_log = []

    def start(self):
        if self.process:
            # already running...
            return False
        else:
            self.loop.add_callback(self.run)
            return True

    def terminate(self):
        if self.process:
            self.process.terminate()
            return True
        else:
            return False

    @property
    def uptime(self):
        if self.start_time:
            return time.time() - self.start_time
        else:
            return None

    async def run(self):
        """Internal method, do not call directly. Use start()"""
        self.start_time = time.time()
        self.running = True
        self.process = await asyncio.create_subprocess_shell(
            self.cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE
        )
        if self.started_callback:
            # let them know we are running...
            self.started_callback(self.cmd)
        done = None
        pending = None
        while self.process.returncode is None:
            tasks = [
                self.read_from("stdout", self.process.stdout),
                self.read_from("stderror", self.process.stderr),
            ]
            done, pending = await asyncio.wait(
                tasks, timeout=self.read_timeout, return_when=asyncio.FIRST_COMPLETED
            )
            for task in pending:
                task.cancel()
            for task in done:
                application_log.debug(f"{task.result()}")
                if task.result():
                    (out_name, out_string) = task.result()
                    if out_string:
                        self.append_to_output_log(out_name, out_string)

        stdout, stderror = await self.process.communicate()
        if stdout:
            self.append_to_output_log("stdout", stdout)
        if stderror:
            self.append_to_output_log("stderror", stderror)
        self.returncode = self.process.returncode
        self.process = None
        self.running = False
        self.complete = True
        # application_log.info(f"{pending}")
        for task in pending:
            task.cancel()
        if self.post_timeout:
            await asyncio.sleep(self.post_timeout)
        if self.complete_callback:
            # let them know we are done...
            self.complete_callback(self.returncode)

        application_log.debug(f"[{self.cmd!r} exited with {self.returncode}]")
        return True

    def append_to_output_log(self, name, output):
        should_callback = False
        if name == "stdout" and output:
            self.stdout = output
            self.stdout_log.append((self.uptime, self.output))
            should_callback = True
        elif name == "stderror" and output:
            self.stderror = output
            self.stderror_log.append((self.uptime, self.output))
            should_callback = True

        if self.output_callback and should_callback:
            # let them know we have output running...
            self.output_callback()

    async def read_from(self, name, source):
        stddata = await source.readline()
        line = stddata.decode("ascii").strip()
        # FIXME: this does not quite strip the colour codes from all text
        #   for the moment it does a pretty good job...
        line = re.sub(r"\x1B\[[0-?]*[ -/]*[@-~]", "", line, flags=re.IGNORECASE)
        return (name, line)
