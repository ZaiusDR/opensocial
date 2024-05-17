import os

from repository import project_repository
from repository import repository


def bulk_save(github_projects):
    if os.getenv('USE_MONGODB') == '1':
        return repository.save_projects(github_projects)

    projects = project_repository.save(github_projects)
    return projects


def get_projects(sorted_by=None, asc=False, page=None):
    if os.getenv('USE_MONGODB') == '1':
        # TODO: Remove this default value once migrated
        if not page:
            page = 0
        return repository.get_projects(page, sorted_by)

    if sorted_by:
        return project_repository.get_sorted_projects(sorted_by, asc, page)
    return project_repository.get_projects(page)
