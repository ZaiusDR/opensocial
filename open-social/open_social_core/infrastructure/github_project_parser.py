import decimal

from datetime import datetime
from dateutil import relativedelta

from domain import github_project


def parse_project_activity(project):
    return github_project.GithubProject(
        project_name=project['name'],
        full_name=project['nameWithOwner'],
        description=project['description'],
        open_issues=project['issues']['totalCount'],
        watchers=project['watchers']['totalCount'],
        stargazers=project['stargazerCount'],
        forks=project['forkCount'],
        project_url=project['url'],
        pushed=project['pushedAt'],
        created=project['createdAt'],
        updated=project['updatedAt'],
        language=project['primaryLanguage']['name'] if project['primaryLanguage'] else None,
        total_commits=project['commitsCount']['history']['totalCount'] if project['commitsCount'] else 0,
        commits_graph_data=_get_commits_graph_data(project),
        archived=project['isArchived']
    )


def _get_commits_graph_data(project):
    commits_graph_data = []

    for i in range(5, -1, -1):
        date = (datetime.now().replace(microsecond=0) - relativedelta.relativedelta(months=i)).strftime('%Y-%m')
        commits_graph_data.append(
            {
                'month': date,
                'commits': decimal.Decimal(
                    len(
                        [commit_date for commit_date
                         in _get_commits(project)
                         if date in commit_date]
                    )
                )
            }
        )
    return commits_graph_data


def _get_commits(project):
    return [
        commit['node']['author']['date']
        for commit in project['commitsCount']['history']['edges']
    ] if project['commitsCount'] else []
