from datetime import date
from dateutil import relativedelta

import requests

from requests import utils

from infrastructure import github_project_parser

GITHUB_API_URL = 'https://api.github.com/'
REPOS_SEARCH_URL = GITHUB_API_URL + 'search/repositories'


def get_project_list(query):
    query.update(sort='updated', per_page='50')
    date_limit = date.today() - relativedelta.relativedelta(months=6)
    should_paginate = True
    github_projects = []
    next_url = None

    while should_paginate:
        if not next_url:
            response = requests.get(REPOS_SEARCH_URL, params=query)
            next_page_header = response.headers['link']
            next_url = _get_url_from_link_header(next_page_header)
        else:
            response = requests.get(next_url)
        for project in response.json()['items']:
            if date.fromisoformat(project['updated_at'].split('T')[0]) < date_limit:
                should_paginate = False
            commits = _get_project_commits(project)
            github_project = github_project_parser.parse_project_activity(project, commits)
            github_projects.append(github_project)
    return github_projects


def _get_project_commits(project):
    commits_url = project['commits_url'].split('{')[0]
    response = requests.get(commits_url)
    return response.json()


def _get_url_from_link_header(header):
    return requests.utils.parse_header_links(header)[0]['url']
