import collections

GithubProject = collections.namedtuple(
    'GithubProject',
    [
        'project_name',
        'full_name',
        'stargazers',
        'watchers',
        'project_url',
        'created',
        'updated'
    ]
)
