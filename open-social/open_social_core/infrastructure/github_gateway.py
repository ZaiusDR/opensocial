import requests

GITHUB_API_URL = 'https://api.github.com/'
REPOS_SEARCH_URL = GITHUB_API_URL + 'search/repositories'


def get_project_list(query):
    params = query
    response = requests.get(REPOS_SEARCH_URL, params=params)
    return response.json()
