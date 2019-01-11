import logging
import sys
import traceback
from functools import wraps

from tornado import web
from tornado.escape import json_decode, json_encode

from graphql.error import GraphQLError
from graphql.error import format_error as format_graphql_error
from graphql import graphql

from .session_control import GraphQLSession
from .session_control import AuthError

from modules.api import api_schema

application_log = logging.getLogger("tornado.application")


def error_status(exception):
    application_log.warn("status", exception)
    if isinstance(exception, web.HTTPError):
        return exception.status_code
    elif isinstance(exception, (ExecutionError, GraphQLError)):
        return 400
    else:
        return 500


def error_format(exception):
    if isinstance(exception, ExecutionError):
        return [{"message": e} for e in exception.errors]
    elif isinstance(exception, GraphQLError):
        return [format_graphql_error(exception)]
    elif isinstance(exception, web.HTTPError):
        return [{"message": exception.log_message, "reason": exception.reason}]
    else:
        return [{"message": "Unknown server error"}]


def error_response(func):
    @wraps(func)
    def wrapper_error_response(self, *args, **kwargs):
        try:
            result = func(self, *args, **kwargs)
        except Exception as ex:
            if not isinstance(ex, (web.HTTPError, ExecutionError, GraphQLError)):
                tb = "".join(traceback.format_exception(*sys.exc_info()))
                application_log.error("Error: {0} {1}".format(ex, tb))
            self.set_status(error_status(ex))
            error_json = json_encode({"errors": error_format(ex)})
            self.write(error_json)
        else:
            return result

    return wrapper_error_response


class ExecutionError(Exception):
    def __init__(self, status_code=400, errors=None):
        self.status_code = status_code
        self.errors = []
        for error in errors:
            if isinstance(error.original_error, AuthError):
                self.status_code = error.original_error.status_code
                self.errors.append(str(error.original_error))
            else:
                self.errors.append(str(error))
        self.message = "\n".join(self.errors)


class GraphQLHandler(web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Credentials", "true")
        self.set_header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        )
        self.set_header("Access-Control-Allow-Methods", "HEAD, PUT, POST, GET, OPTIONS")

    def options(self):
        self.set_status(204)

    # @GraphQLSession.ensure_active_session
    @error_response
    async def post(self):
        return await self.handle_graqhql()

    async def handle_graqhql(self):
        result = await self.execute_graphql()
        application_log.debug(f"Request header: {self.request.headers}")
        application_log.debug(
            f"GraphQL result data: {result.data} result errors: {result.errors}"
        )
        if result and result.errors:
            # an error occured during the graphql query
            ex = ExecutionError(errors=result.errors)
            self.set_status(ex.status_code)
            application_log.warn("GraphQL Error: %s", ex.message)
            self.write("GraphQL Error: {}".format(ex.message))
            return
        # only return result data if we dont have errors
        response = {"data": result.data}
        self.write(response)

    async def execute_graphql(self):
        graphql_req = self.graphql_request
        application_log.debug(f"GraphQL request data: {graphql_req}")
        provided_context = graphql_req.get("context", {})
        result = await graphql(
            schema=self.schema,
            source=graphql_req.get("query"),
            root_value=None,  # resolve root
            context_value={**provided_context, **self.context},  # resolve info
            variable_values=graphql_req.get("variables", {}),
            operation_name=graphql_req.get("operationName", None),
        )
        return result

    @property
    def graphql_request(self):
        return json_decode(self.request.body)

    @property
    def content_type(self):
        return self.request.headers.get("Content-Type", "text/plain").split(";")[0]

    @property
    def schema(self):
        return api_schema

    @property
    def middleware(self):
        return []

    @property
    def context(self):
        auth = self.request.headers.get("Authorization", "")
        if "Bearer " in auth:
            auth = auth.lstrip("Bearer ")
        else:
            auth = None
        # TODO: provide DB object via options to context
        return {"authorization": auth, "session": self.current_user, "db_access": None}

    @property
    def active_session(self):
        return None
