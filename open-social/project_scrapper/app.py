import json

from open_social_core.infrastructure import github_gateway
from open_social_core.service import project_service


def lambda_handler(event, context):
    projects_json = github_gateway.get_project_list()
    projects = project_service.save(projects_json)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "hello world",
        }),
    }
