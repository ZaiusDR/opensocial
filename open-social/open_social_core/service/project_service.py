from repository import repository


def bulk_save(github_projects):
    return repository.save_projects(github_projects)


def get_projects(page, sorted_by):
    return repository.get_projects(page, sorted_by)
