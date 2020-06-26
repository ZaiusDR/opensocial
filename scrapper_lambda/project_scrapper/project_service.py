from scrapper_lambda.project_scrapper import github_project_parser
from scrapper_lambda.project_scrapper import project_repository


def save(projects_json):
    projects = [github_project_parser.parse_project_activity(project)
                for project
                in projects_json['items']]
    return project_repository.save(projects)
