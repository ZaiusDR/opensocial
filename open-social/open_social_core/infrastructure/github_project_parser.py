from datetime import datetime
from dateutil import relativedelta
from datetime import timedelta

from domain import github_project
from infrastructure import rate_calculator


def parse_project_activity(project):
    contributors = _get_contributors(project)
    total_commits = project['defaultBranchRef']['target']['history']['totalCount'] \
        if project['defaultBranchRef'] else 0

    return github_project.GithubProject(
        project_name=project['name'],
        full_name=project['nameWithOwner'],
        description=_get_ellipsized_description(project['description']),
        contributors=contributors,
        open_issues=project['issues']['totalCount'],
        watchers=project['watchers']['totalCount'],
        stargazers=project['stargazerCount'],
        forks=project['forkCount'],
        project_url=project['url'],
        pushed=project['pushedAt'],
        created=project['createdAt'],
        updated=project['updatedAt'],
        language=project['primaryLanguage']['name'] if project['primaryLanguage'] else None,
        total_commits=total_commits,
        commits_graph_data=_get_commits_graph_data(project),
        rate=rate_calculator.get_project_rating(
            project['createdAt'], project['pushedAt'], contributors, total_commits
        ),
        sorting=0,
        ttl=int((datetime.today() + timedelta(days=7)).timestamp())
    )


def _get_ellipsized_description(description):
    if description and len(description) > 600:
        description = description[:600] + '...'
    return description


def _get_commits_graph_data(project):
    commits_graph_data = []

    for i in range(5, -1, -1):
        date = (datetime.now().replace(microsecond=0) - relativedelta.relativedelta(months=i)).strftime('%Y-%m')
        commits_graph_data.append(
            {
                'month': date,
                'commits': len([commit_date for commit_date in _get_commits(project) if date in commit_date])
            }
        )
    return commits_graph_data


def _get_commits(project):
    return [
        commit['node']['author']['date']
        for commit in project['defaultBranchRef']['target']['history']['edges']
    ] if project['defaultBranchRef'] else []


def _get_contributors(project):
    return len({
        commit['node']['author']['name']
        for commit in project['defaultBranchRef']['target']['history']['edges']
    }) if project['defaultBranchRef'] else 0
