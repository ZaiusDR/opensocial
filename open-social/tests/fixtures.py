from open_social_core.domain import github_project


github_projects = [
    github_project.GithubProject(
        project_name='project_1',
        full_name='user1/project_1',
        stargazers=24,
        watchers=15,
        project_url='url_1',
        created='2019-08-04T05:36:49Z',
        updated='2019-08-06T07:38:15Z'
    ),
    github_project.GithubProject(
        project_name='project_2',
        full_name='user2/project_2',
        stargazers=25,
        watchers=34,
        project_url='url_2',
        created='2019-08-13T11:01:35Z',
        updated='2019-08-13T11:12:55Z'
    )
]
