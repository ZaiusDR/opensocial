import json

from infrastructure import github_gateway
from repository import repository


def lambda_handler(event, context):
    github_projects = github_gateway.get_project_list(event)
    repository.save_languages(github_projects)
    projects = repository.save_projects(github_projects)

    repository.save_topic(event['topic'])

    return {
        "statusCode": 200,
        "body": json.dumps({
            "projects": projects,
        }),
    }
