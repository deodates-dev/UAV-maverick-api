# std lib imports
import logging
import sys
import ssl
import signal
from pathlib import Path

# tornado imports
import tornado.ioloop
from tornado.options import options

from graphql import (
    graphql_sync,
    get_introspection_query,
    build_client_schema,
    print_schema,
)


from maverick_api.modules.base.tornadoql.tornadoql import TornadoQL
from maverick_api.modules.base.database import MavDatabase

from maverick_api.modules import (
    generate_schema,
    get_api_schema,
    get_module_schema,
    start_all_modules,
    stop_all_schema,
    stop_all_modules,
)

application_log = logging.getLogger("tornado.application")


class ApiServer(object):
    def __init__(self):
        self.exit = False
        self.server = None
        self.database = None

        signal.signal(signal.SIGINT, self.handle_signal)
        signal.signal(signal.SIGTERM, self.handle_signal)

    def initialize(self):
        loop = tornado.ioloop.IOLoop.current()

        generate_schema()
        api_schema = get_api_schema()
        module_schema = get_module_schema()

        if options.generate_schema_and_exit:
            query = get_introspection_query(descriptions=False)
            introspection_query_result = graphql_sync(api_schema, query)
            client_schema = build_client_schema(introspection_query_result.data)
            sdl = print_schema(client_schema)

            with open(
                Path(options.basedir).joinpath("..", "schema.graphql").resolve(), "w+"
            ) as fid:
                fid.write(sdl)
            sys.exit(0)

        start_all_modules()
        self.database = MavDatabase()
        ssl_options = self.get_ssl_options()

        application = TornadoQL()
        self.server = tornado.httpserver.HTTPServer(
            application, ssl_options=ssl_options
        )
        self.server.listen(port=options.server_port, address=options.server_interface)
        application_log.info(
            f"Starting Maverick API server: {options.server_interface}:{options.server_port}/{options.app_prefix}"
        )

    def get_ssl_options(self):
        ssl_options = None
        if not options.disable_ssl:
            # Create an SSL context to be used by the server
            application_log.info(
                f"SSL option enabled, attempting to load ssl_keyfile and ssl_certfile..."
            )
            ssl_keyfile = None
            ssl_certfile = None

            if options.ssl_keyfile:
                ssl_keyfile = Path(options.ssl_keyfile).resolve()
                if not ssl_keyfile.is_file():
                    application_log.error(
                        f"ssl_keyfile option does not point to a valid file: {options.ssl_keyfile}"
                    )
                    ssl_keyfile = None
            else:
                application_log.error("ssl_keyfile option was not provided")

            if options.ssl_certfile:
                ssl_certfile = Path(options.ssl_certfile).resolve()
                if not ssl_certfile.is_file():
                    application_log.error(
                        f"ssl_certfile option does not point to a valid file: {options.ssl_certfile}"
                    )
                    ssl_certfile = None
            else:
                application_log.error("ssl_certfile option was not provided")

            if ssl_keyfile and ssl_certfile:
                ssl_options = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
                ssl_options.check_hostname = False
                try:
                    ssl_options.load_cert_chain(ssl_certfile, keyfile=ssl_keyfile)
                except Exception as e:
                    application_log.error(f"Error loading certificates: {repr(e)}")
                    ssl_options = None

            if not ssl_options:
                application_log.critical(
                    f"Failed to load SSL certificates, server will now exit"
                )
                sys.exit(1)
            else:
                application_log.info(f"Starting server with SSL, content is secure")

        else:
            application_log.info(f"Starting server without SSL, content is not secure")

        return ssl_options

    def serve(self):
        tornado.ioloop.IOLoop.current().start()
        # this function blocks at this point until the server
        #  is asked to exit via request_stop()
        self.exit_gracefully()

    def request_stop(self):
        # TODO: close all websocket connections (required?)
        self.exit = True
        ioloop = tornado.ioloop.IOLoop.current()
        ioloop.add_callback(ioloop.stop)
        application_log.info("Stopping Maverick API server")

    def exit_gracefully(self):
        ioloop = tornado.ioloop.IOLoop.current()
        stop_all_modules()
        stop_all_schema()
        if self.database:
            ioloop.run_sync(self.database.shutdown)
        ioloop.close()
        application_log.info("Maverick API server has stopped")

    def handle_signal(self, signum, frame):
        """called on sigterm"""
        ioloop = tornado.ioloop.IOLoop.current()
        ioloop.add_callback_from_signal(self.request_stop)
