from repository import repository


def bulk_save(github_projects):
    return repository.save_projects(github_projects)


def get_projects(page=0, sorted_by=None):
    return repository.get_projects(page=page, sorted_by=sorted_by)
