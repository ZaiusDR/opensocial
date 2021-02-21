import json

from infrastructure import github_gateway_gql
from service import project_service


def lambda_handler(event, context):
    github_projects = github_gateway_gql.get_project_list(event)
    projects = project_service.bulk_save(github_projects)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "projects": projects,
        }),
    }
