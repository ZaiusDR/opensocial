import json

from infrastructure import github_gateway
from repository import repository


def lambda_handler(event, context):
    github_projects = github_gateway.get_project_list(event)
    projects = repository.save_projects(github_projects)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "projects": projects,
        }),
    }
