import logging
import copy
import os
import pathlib
import asyncio
import time
import functools

from pystemd.dbuslib import DBus
from pystemd.systemd1 import Unit
from pystemd.systemd1 import Manager

from maverick_api.modules import schemaBase
from maverick_api.modules.base.util.process_runner import ProcessRunner


# graphql imports
from graphql import (
    GraphQLArgument,
    GraphQLField,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
)
from graphql.pyutils.event_emitter import EventEmitterAsyncIterator

application_log = logging.getLogger("tornado.application")

from tornado.options import options


class MaverickServiceSchema(schemaBase):
    def __init__(self):
        super().__init__(self)
        loop = tornado.ioloop.IOLoop.current()
        self.service_command_name = "MaverickService"
        # self.service_command_category_name = self.service_command_name + "Category"
        self.service_command_list_name = self.service_command_name + "List"
        self.service_definition_path = (
            pathlib.Path(options.service_definition_path).expanduser().resolve()
        )
        self.meta_info_file = "__init__"
        self.services = self.read_services_dbus()
        self.process_runner_timeout = 1  # seconds
        self.stop_event = asyncio.Event()
        loop.add_callback(functools.partial(self.monitor, self.services))

        self.service_command_type = GraphQLObjectType(
            self.service_command_name,
            lambda: {
                "name": GraphQLField(
                    GraphQLString, description="Service identifier name",
                ),
                "displayName": GraphQLField(
                    GraphQLString, description="Service display name",
                ),
                "category": GraphQLField(
                    GraphQLString, description="Service category identifier",
                ),
                "displayCategory": GraphQLField(
                    GraphQLString, description="Service category name",
                ),
                "enabled": GraphQLField(
                    GraphQLBoolean, description="If the service is enabled at boot",
                ),
                "running": GraphQLField(
                    GraphQLBoolean, description="If the service is currently running"
                ),
                "updateTime": GraphQLField(
                    GraphQLInt,
                    description="Time when the service status was last updated",
                ),
            },
            description="Maverick service interface",
        )

        self.service_command_list_type = GraphQLObjectType(
            self.service_command_list_name,
            lambda: {"services": GraphQLField(GraphQLList(self.service_command_type)),},
        )

        self.q = {
            self.service_command_name: GraphQLField(
                self.service_command_type,
                args={
                    "name": GraphQLArgument(
                        GraphQLString, description="Service identifier name",
                    ),
                    "category": GraphQLArgument(
                        GraphQLString, description="Service category identifier",
                    ),
                },
                resolve=self.get_service_status,
            ),
            self.service_command_list_name: GraphQLField(
                self.service_command_list_type, resolve=self.get_service_status_list,
            ),
        }

        self.m = {
            self.service_command_name: GraphQLField(
                self.service_command_type,
                args=self.get_mutation_args(self.service_command_type),
                resolve=self.set_service_status,
            )
        }

        self.s = {
            self.service_command_name: GraphQLField(
                self.service_command_type,
                subscribe=self.sub_service_status,
                resolve=None,
            )
        }

    def read_services_dbus(self):
        services = []
        with Manager() as manager:
            for _unit in manager.Manager.ListUnits():
                idx = _unit[0].find(b"maverick-")
                if idx == -1: 
                    continue
                services.append({
                    "unit": Unit(_unit[0]), 
                    "category_name": None,
                    "category_display_name": None,
                    "command": _unit[0][0:-8].decode(),
                    "service_name": _unit[0][9:-8].decode(),
                    "service_display_name": _unit[1].decode(),
                    "category_index": None,
                    "service_index": None,
                    "last_update": None,
                    "enabled": None,
                    "running": True if _unit[4] == b'running' else False,
                })
        for service in services:
            application_log.debug(f"Adding service: {service}")


    def read_services(self):
        services = []
        try:
            service_folders = [
                f.name for f in os.scandir(self.service_definition_path) if f.is_dir()
            ]
            service_folders.sort()
            for idx, service_folder in enumerate(service_folders):
                service_folder_path = self.service_definition_path.joinpath(
                    service_folder
                )
                category = service_folder.split(".")[-1].strip().lower()  # e.g.: dev

                service_files = [
                    f.name for f in os.scandir(service_folder_path) if f.is_file()
                ]
                service_files.sort()
                sub_idx = 0

                if self.meta_info_file in service_files:
                    meta_info = ""
                    with open(
                        service_folder_path.joinpath(self.meta_info_file), "r+"
                    ) as fid:
                        meta_info = fid.read().strip()

                for service_file in [
                    x for x in service_files if x != self.meta_info_file
                ]:
                    with open(service_folder_path.joinpath(service_file), "r+") as fid:
                        service_info = fid.readlines()
                        for line in [x for x in service_info if x.strip()]:
                            line = line.split(",")
                            service_name = line[0].strip().lower()
                            display_name = line[1].strip()
                            services.append(
                                {
                                    "category_name": category,
                                    "category_display_name": meta_info,
                                    "command": f"maverick-{service_name}",
                                    "service_name": service_name,
                                    "service_display_name": display_name,
                                    "category_index": idx,
                                    "service_index": sub_idx,
                                    "last_update": None,
                                    "enabled": None,
                                    "running": None,
                                }
                            )
                            sub_idx += 1

            for service in services:
                application_log.debug(f"Adding service: {service}")

        except FileNotFoundError:
            application_log.warning(
                f"Could not find service folder at: {self.service_definition_path}"
            )
        return services

    def process(self, msg, error=None, userdata=None):
        msg.process_reply(True)
        member = msg.headers.get("Member", None)

        if member == b"PropertiesChanged":
            unit_path = msg.headers.get("Path", None)
            sub_state = msg.body[1].get(b"SubState", None)
            timestamp_monotonic = msg.body[1].get(b"StateChangeTimestampMonotonic", None)
            if unit_path and sub_state:
                # TODO: set service property
                # [service for service in userdata if unit_path[]]
                application_log.info(sub_state)
                application_log.info(timestamp_monotonic)
        elif member == b"UnitFilesChanged":
            # print("An enable / disable event occured")
            service_tasks = []
            service_command = {}
            for service in userdata:
                service_tasks.append(
                    asyncio.create_task(
                        self._get_service_status(service, copy.deepcopy(service_command))
                    )
                )
            await asyncio.gather(*service_tasks, return_exceptions=True)
        else:
            pass


    def read_callback(self, fd, event, **kwargs):
        kwargs["bus"].process()


    async def monitor(self, units):
        loop = tornado.ioloop.IOLoop.current()

        with DBus() as bus:
            for service_data in units:
                bus.match_signal(
                    service_data["unit"].destination,
                    service_data["unit"].path,
                    b"org.freedesktop.DBus.Properties",
                    b"PropertiesChanged",
                    self.process,
                    self.services,
                )
            bus.match_signal(
                b"org.freedesktop.systemd1",
                None,
                None,
                b"UnitFilesChanged",
                self.process,
                self.services,
            )
            loop.add_handler(
                bus.get_fd(), functools.partial(self.read_callback, bus=bus), loop.READ
            )
            await self.stop_event.wait()

    def filter_services(self, service_command):
        services = self.services.copy()

        # Both or one of category and name must be provided with the mutation
        if not service_command["category"] and not service_command["name"]:
            application_log.warning(
                "No service category or service name was provided. No action taken."
            )
            return []

        # Filter the avalble services by category, if provided
        if service_command["category"]:
            services = [
                x for x in services if x["category_name"] == service_command["category"]
            ]

        # Filter the avalble services by name, if provided
        if service_command["name"]:
            services = [
                x for x in services if x["service_name"] == service_command["name"]
            ]

        # Check to ensure we have a service left over after the filtering
        if len(services) < 1:
            application_log.warning(
                f"No services were selected using service category = {service_command['category']} and service name = {service_command['name']}."
            )
            return []

        return services

    async def set_service_status(self, root, info, **kwargs):
        application_log.debug(f"set_service_status {kwargs}")

        service_command = {}
        service_command["name"] = kwargs.get("name", "").lower()
        service_command["enabled"] = kwargs.get("enabled", None)
        service_command["category"] = kwargs.get("category", "").lower()
        service_command["running"] = kwargs.get("running", None)

        services = self.filter_services(service_command)
        if not services:
            return

        service_tasks = []
        for service in services:
            service_tasks.append(
                asyncio.create_task(
                    self.modify_service(service, copy.deepcopy(service_command))
                )
            )
        await asyncio.gather(*service_tasks, return_exceptions=True)
        return
    
    def _set_service_status(self):
        

    async def modify_service(self, service, service_command):
        service_command["name"] = service["service_name"]
        service_command["displayName"] = service["service_display_name"]
        service_command["displayCategory"] = service["category_display_name"]

        if service_command["enabled"] is None:
            pass
        elif service_command["enabled"]:
            cmd = f"sudo systemctl enable {service['command']}"
            ret = await self.run_command(cmd)
            if ret:
                service_command["enabled"] = True
            else:
                service_command["enabled"] = None

        else:
            cmd = f"sudo systemctl disable {service['command']}"
            ret = await self.run_command(cmd)
            if ret:
                service_command["enabled"] = False
            else:
                service_command["enabled"] = None

        if service_command["running"] is None:
            pass
        elif service_command["running"]:
            cmd = f"sudo systemctl start {service['command']}"
            ret = await self.run_command(cmd)
            if ret:
                service_command["running"] = True
            else:
                service_command["running"] = None
        else:
            cmd = f"sudo systemctl stop {service['command']}"
            ret = await self.run_command(cmd)
            if ret:
                service_command["running"] = False
            else:
                service_command["running"] = None

        await self._get_service_status(service, service_command)

    async def get_service_status(self, root, info, **kwargs):
        application_log.debug(f"get_service_status {kwargs}")

        service_command = {}
        service_command["name"] = kwargs.get("name", "").lower()
        service_command["category"] = kwargs.get("category", "").lower()

        services = self.filter_services(service_command)
        if not services:
            return

        service_tasks = []
        for service in services:
            service_tasks.append(
                asyncio.create_task(
                    self._get_service_status(service, copy.deepcopy(service_command))
                )
            )
        await asyncio.gather(*service_tasks, return_exceptions=True)
        return

    async def _get_service_status(self, service, service_command):
        service_command["name"] = service["service_name"]
        service_command["displayName"] = service["service_display_name"]
        service_command["displayCategory"] = service["category_display_name"]
        service_command["category"] = service["category_name"]

        cmd = f"systemctl --no-pager status {service['command']}"
        ret = await self.run_command(cmd)
        if ret:
            service_command["running"] = True
        else:
            service_command["running"] = False

        cmd = f"systemctl is-enabled {service['command']}"
        ret = await self.run_command(cmd)
        if ret:
            service_command["enabled"] = True
        else:
            service_command["enabled"] = False
        update_time = int(time.time())
        self.service_status[service["service_name"]]["enabled"] = service_command[
            "enabled"
        ]
        self.service_status[service["service_name"]]["running"] = service_command[
            "running"
        ]

        self.service_status[service["service_name"]]["last_update"] = update_time
        service_command["updateTime"] = update_time
        self.emit_subscription(service_command)

    async def run_command(self, cmd):
        if cmd:
            try:
                ret = await asyncio.wait_for(
                    ProcessRunner(cmd).run(shell=True), self.process_runner_timeout
                )
                if ret == 0:
                    return True
                else:
                    return False
            except asyncio.TimeoutError:
                application_log.warning(
                    f"A timeout occurred while running service command: {cmd}"
                )
                return None
        else:
            application_log.warning(f"Not able to run service command: {cmd}")
            return None

    def emit_subscription(self, service_command):
        self.subscriptions.emit(
            self.subscription_string + self.service_command_name,
            {self.service_command_name: service_command},
        )

    def sub_service_status(self, root, info):
        return EventEmitterAsyncIterator(
            self.subscriptions, self.subscription_string + self.service_command_name,
        )

    async def get_service_status_list(self, root, info, **kwargs):
        service_command = {}

        service_tasks = []
        for service in self.services:
            service_tasks.append(
                asyncio.create_task(
                    self._get_service_status(service, service_command.copy())
                )
            )
        await asyncio.gather(*service_tasks, return_exceptions=True)

        service_list = []
        for service in self.services:
            service_status = {
                "name": service["service_name"],
                "displayName": service["service_display_name"],
                "category": service["category_name"],
                "displayCategory": service["category_display_name"],
                "enabled": self.service_status[service["service_name"]]["enabled"],
                "running": self.service_status[service["service_name"]]["running"],
                "updateTime": self.service_status[service["service_name"]][
                    "last_update"
                ],
            }
            self.emit_subscription(service_status)
            service_list.append(service_status)
        return {"services": service_list}
