import decimal
import json

from service import project_service


def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Hello World!",
        }),
    }


def list_projects(event, context):
    projects = project_service.get_projects()

    return {
        "statusCode": 200,
        "body": json.dumps(projects, default=decimal_default),
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,Content-Encoding"
        }
    }


def decimal_default(obj):
    if isinstance(obj, decimal.Decimal):
        return int(obj)
    raise TypeError
