import collections

GithubProject = collections.namedtuple(
    'GithubProject',
    [
        'full_name',
        'project_name',
        'description',
        'open_issues',
        'watchers',
        'forks',
        'project_url',
        'created',
        'updated',
        'language',
        'last_commit_dates',
        'archived'
    ]
)
