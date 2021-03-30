import collections

GithubProject = collections.namedtuple(
    'GithubProject',
    [
        'full_name',
        'project_name',
        'description',
        'contributors',
        'open_issues',
        'watchers',
        'stargazers',
        'forks',
        'project_url',
        'pushed',
        'created',
        'updated',
        'language',
        'total_commits',
        'commits_graph_data',
        'rate',
        'sorting',
        'ttl'
    ]
)
