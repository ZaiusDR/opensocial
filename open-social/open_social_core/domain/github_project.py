import collections

GithubProject = collections.namedtuple(
    'GithubProject',
    [
        'full_name',
        'project_name',
        'description',
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
        'archived'
    ]
)
