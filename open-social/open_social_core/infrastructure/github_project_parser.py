from domain import github_project


def parse_project_activity(project, commits_json):
    return github_project.GithubProject(
        project_name=project['name'],
        full_name=project['full_name'],
        description=project['description'],
        open_issues=project['open_issues_count'],
        watchers=project['watchers_count'],
        forks=project['forks_count'],
        project_url=project['html_url'],
        created=project['created_at'],
        updated=project['updated_at'],
        language=project['language'],
        last_commit_dates=[
            commit['commit']['author']['date']
            for commit in commits_json
            if type(commits_json) is list
        ]
    )
