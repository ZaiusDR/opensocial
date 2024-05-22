from repository import repository


def bulk_save(github_projects):
    return repository.save_projects(github_projects)


def get_projects(sorted_by=None, page=0):
    return repository.get_projects(page=page, sorted_by=sorted_by)
