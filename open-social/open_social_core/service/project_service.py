from repository import project_repository
from repository import repository


def bulk_save(github_projects):
    projects = project_repository.save(github_projects)
    repository.save_projects(github_projects)
    return projects


def get_projects(sorted_by=None, asc=False, page=None):
    if sorted_by:
        return project_repository.get_sorted_projects(sorted_by, asc, page)
    return project_repository.get_projects(page)
