import requests

from infrastructure import github_project_parser

GITHUB_API_URL = 'https://api.github.com/'
REPOS_SEARCH_URL = GITHUB_API_URL + 'search/repositories'


def get_project_list(query):
    response = requests.get(REPOS_SEARCH_URL, params=query)
    github_projects = []

    for project in response.json()['items']:
        commits = _get_project_commits(project)
        github_project = github_project_parser.parse_project_activity(project, commits)
        github_projects.append(github_project)
    return github_projects


def _get_project_commits(project):
    print(project['commits_url'].split('{')[0])
    commits_url = project['commits_url'].split('{')[0]
    response = requests.get(commits_url)
    return response.json()
