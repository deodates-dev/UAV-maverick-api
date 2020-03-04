# std lib imports
import logging
import sys
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

from maverick_api.modules import (
    generate_schema,
    get_api_schema,
    get_module_schema,
    start_all_modules,
    stop_all_modules,
)

application_log = logging.getLogger("tornado.application")


class ApiServer(object):
    def __init__(self):
        self.exit = False
        self.server = None
        self.mavros_connection = None
        self.mavlink_connection = None

        signal.signal(signal.SIGINT, self.exit_gracefully)
        signal.signal(signal.SIGTERM, self.exit_gracefully)

    def initialize(self):
        # setup the connection to ROS
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
            sys.exit()

        start_all_modules()

        application = TornadoQL()
        self.server = tornado.httpserver.HTTPServer(application)
        self.server.listen(port=options.server_port, address=options.server_interface)
        application_log.info(
            f"Starting Maverick API server: {options.server_interface}:{options.server_port}/{options.app_prefix}"
        )

    def serve(self):
        tornado.ioloop.IOLoop.current().start()
        # this function blocks at this point until the server
        # is asked to exit via request_stop()
        application_log.info("Maverick API server has stopped")

    def request_stop(self):
        # TODO: close all websocket connections (required?)
        ioloop = tornado.ioloop.IOLoop.current()
        ioloop.add_callback(ioloop.stop)
        application_log.info("Stopping Maverick API server")

    def exit_gracefully(self, signum, frame):
        """called on sigterm"""
        self.exit = True
        stop_all_modules()
        self.request_stop()
