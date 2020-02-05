# std lib imports
import logging
import os
import sys
import signal
import threading
import json
from pathlib import Path

# tornado imports
import tornado.ioloop
from tornado.options import options

from graphql import graphql_sync, get_introspection_query

# module imports
from maverick_api.modules.base.tornadoql.tornadoql import TornadoQL

# import modules
# from maverick_api.modules.api.mavros import MAVROSConnection
from maverick_api.modules.api.status import StatusModule
from maverick_api.modules import generate_schema

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
        (api_schema, module_schema) = generate_schema()

        if options.generate_schema_and_exit:
            query = get_introspection_query(descriptions=True)
            introspection_query_result = graphql_sync(api_schema, query)
            introspection_dict = introspection_query_result.data
            with open(
                Path(options.basedir).joinpath("..", "schema.json").resolve(), "w+"
            ) as fid:
                fid.write(json.dumps(introspection_dict, indent=4, sort_keys=True))
            sys.exit()

        self.mavros_connection = None
        # self.mavros_connection = MAVROSConnection(loop, module_schema)
        # self.mavros_thread = threading.Thread(target=self.mavros_connection.run)
        # self.mavros_thread.daemon = True
        # self.mavros_thread.start()
        self.status_module = StatusModule(loop, module_schema)

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
        if self.mavros_connection:
            self.mavros_connection.shutdown()
        if self.mavlink_connection:
            self.mavlink_connection.shutdown()
        self.request_stop()
