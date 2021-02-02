import json

from infrastructure import github_gateway
from service import project_service


def lambda_handler(event, context):
    projects_json = github_gateway.get_project_list(event)
    projects = project_service.save(projects_json)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "projects": projects,
        }),
    }
