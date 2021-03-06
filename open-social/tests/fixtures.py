from open_social_core.domain import github_project


github_projects = [
    github_project.GithubProject(
        project_name='project_1',
        full_name='user1/project_1',
        description='description1',
        contributors=18,
        open_issues=30,
        watchers=15,
        stargazers=25,
        forks=28,
        project_url='url_1',
        pushed='2020-10-13T13:10:42Z',
        created='2019-08-04T05:36:49Z',
        updated='2019-08-06T07:38:15Z',
        language='Python',
        total_commits=24,
        commits_graph_data={},
        rate=0.8,
        sorting=0,
        ttl=1616659119
    ),
    github_project.GithubProject(
        project_name='project_2',
        full_name='user2/project_2',
        description='description2',
        contributors=23,
        open_issues=239,
        watchers=34,
        stargazers=29,
        forks=0,
        project_url='url_2',
        pushed='2019-08-13T11:12:55Z',
        created='2019-08-13T11:01:35Z',
        updated='2019-08-13T11:12:55Z',
        language='Javascript',
        total_commits=59,
        commits_graph_data={},
        rate=0.23,
        sorting=0,
        ttl=1616659119
    )
]

github_projects_pagination = [
    github_project.GithubProject(
        project_name='project_1',
        full_name='user1/project_1',
        description='description1',
        contributors=1,
        open_issues=30,
        watchers=15,
        stargazers=25,
        forks=28,
        project_url='url_1',
        pushed='2020-10-13T13:10:42Z',
        created='2019-08-04T05:36:49Z',
        updated='2019-08-06T07:38:15Z',
        language='Python',
        total_commits=38,
        commits_graph_data={},
        rate=0.12,
        sorting=0,
        ttl=1616659119
    ),
    github_project.GithubProject(
        project_name='project_2',
        full_name='user2/project_2',
        description='description2',
        contributors=15,
        open_issues=239,
        watchers=34,
        stargazers=29,
        forks=0,
        project_url='url_2',
        pushed='2019-08-13T11:12:55Z',
        created='2019-08-13T11:01:35Z',
        updated='2019-08-13T11:12:55Z',
        language='Javascript',
        total_commits=59,
        commits_graph_data={},
        rate=0.43,
        sorting=0,
        ttl=1616659119
    ),
    github_project.GithubProject(
        project_name='project_3',
        full_name='user1/project_3',
        description='description1',
        contributors=0,
        open_issues=30,
        watchers=15,
        stargazers=25,
        forks=28,
        project_url='url_1',
        pushed='2020-10-13T13:10:42Z',
        created='2019-08-04T05:36:49Z',
        updated='2019-08-06T07:38:15Z',
        language='Python',
        total_commits=24,
        commits_graph_data={},
        rate=0.23,
        sorting=0,
        ttl=1616659119
    ),
    github_project.GithubProject(
        project_name='project_4',
        full_name='user2/project_4',
        description='description2',
        contributors=19,
        open_issues=239,
        watchers=34,
        stargazers=29,
        forks=0,
        project_url='url_2',
        pushed='2019-08-13T11:12:55Z',
        created='2019-08-13T11:01:35Z',
        updated='2019-08-13T11:12:55Z',
        language='Javascript',
        total_commits=61,
        commits_graph_data={},
        rate=0.46,
        sorting=0,
        ttl=1616659119
    ),
    github_project.GithubProject(
        project_name='project_5',
        full_name='user1/project_5',
        description='description1',
        contributors=30,
        open_issues=30,
        watchers=15,
        stargazers=25,
        forks=28,
        project_url='url_1',
        pushed='2020-10-13T13:10:42Z',
        created='2019-08-04T05:36:49Z',
        updated='2019-08-06T07:38:15Z',
        language='Python',
        total_commits=5,
        commits_graph_data={},
        rate=0.98,
        sorting=0,
        ttl=1616659119
    ),
    github_project.GithubProject(
        project_name='project_6',
        full_name='user2/project_6',
        description='description2',
        contributors=3,
        open_issues=239,
        watchers=34,
        stargazers=29,
        forks=0,
        project_url='url_2',
        pushed='2019-08-13T11:12:55Z',
        created='2019-08-13T11:01:35Z',
        updated='2019-08-13T11:12:55Z',
        language='Javascript',
        total_commits=0,
        commits_graph_data={},
        rate=0.56,
        sorting=0,
        ttl=1616659119
    )
]
