from scrapper_lambda.project_scrapper import github_gateway
from scrapper_lambda.project_scrapper import project_service


def lambda_handler(event, context):
    projects_json = github_gateway.get_project_list()
    projects = project_service.save(projects_json)
    return projects
