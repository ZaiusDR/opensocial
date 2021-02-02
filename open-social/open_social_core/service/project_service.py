from repository import project_repository


def bulk_save(github_projects):
    return project_repository.save(github_projects)


def get_projects():
    return project_repository.get_projects()
