from domain import github_project


def parse_project_activity(project):
    return github_project.GithubProject(
        project_name=project['nameWithOwner'],
        full_name=project['nameWithOwner'],
        description=project['description'],
        open_issues=project['issues']['totalCount'],
        watchers=project['watchers']['totalCount'],
        forks=project['forkCount'],
        project_url=project['url'],
        created=project['createdAt'],
        updated=project['updatedAt'],
        language=project['primaryLanguage']['name'] if project['primaryLanguage'] else None,
        last_commit_dates=[
            commit['node']['author']['date']
            for commit in project['commitsCount']['history']['edges']
        ] if project['commitsCount'] else [],
        archived=project['isArchived']
    )
