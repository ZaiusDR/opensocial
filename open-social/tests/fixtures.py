from open_social_core.domain import github_project


github_projects = [
    github_project.GithubProject(
        project_name='project_1',
        full_name='user1/project_1',
        description='description1',
        open_issues=30,
        stargazers=24,
        watchers=15,
        forks=28,
        project_url='url_1',
        created='2019-08-04T05:36:49Z',
        updated='2019-08-06T07:38:15Z',
        language='Python',
        last_commit_dates=['2019-02-06T07:38:15Z']
    ),
    github_project.GithubProject(
        project_name='project_2',
        full_name='user2/project_2',
        description='description2',
        open_issues=239,
        stargazers=25,
        watchers=34,
        forks=0,
        project_url='url_2',
        created='2019-08-13T11:01:35Z',
        updated='2019-08-13T11:12:55Z',
        language='Javascript',
        last_commit_dates=['2019-03-13T11:12:55Z', '2019-06-13T08:11:24Z']
    )
]
