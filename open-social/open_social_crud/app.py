import json

import boto3


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
        "body": json.dumps(projects)
    }
