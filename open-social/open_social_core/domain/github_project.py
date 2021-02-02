import collections

GithubProject = collections.namedtuple(
    'GithubProject',
    [
        'project_name',
        'full_name',
        'description',
        'open_issues',
        'stargazers',
        'watchers',
        'forks',
        'project_url',
        'created',
        'updated',
        'language',
        'last_commit_dates'
    ]
)
