from repository import project_repository
from service import github_project_parser


def save(projects_json):
    projects = [github_project_parser.parse_project_activity(project)
                for project
                in projects_json['items']]
    return project_repository.save(projects)
