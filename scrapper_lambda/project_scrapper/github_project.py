import collections

GithubProject = collections.namedtuple(
    'GithubProject',
    [
        'project_name',
        'stargazers',
        'project_url'
    ]
)
