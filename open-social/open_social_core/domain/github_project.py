import collections

GithubProject = collections.namedtuple(
    'GithubProject',
    [
        'project_name',
        'full_name',
        'stargazers',
        'project_url'
    ]
)
