from repository import project_repository


def bulk_save(github_projects):
    return project_repository.save(github_projects)


def get_projects(sorted_by=None, asc=None, page=None):
    if sorted_by:
        return project_repository.get_sorted_projects(sorted_by, asc, page)
    return project_repository.get_projects(page)
