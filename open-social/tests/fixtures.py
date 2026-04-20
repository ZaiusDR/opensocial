import datetime

from open_social_core.domain import github_project


github_projects = [
    github_project.GithubProjectDTO(
        project_name='project_1',
        full_name='user1/project_1',
        avatar_url='fake_url_1',
        description='description1',
        homepage='https://fake_homepage.com',
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
        topic='feminism',
        sorting=0
    ),
    github_project.GithubProjectDTO(
        project_name='project_2',
        full_name='user2/project_2',
        avatar_url='fake_url_2',
        description='description2',
        homepage='https://fake_homepage.com',
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
        topic='feminism',
        sorting=0
    )
]

updated_github_projects = [
    github_project.GithubProjectDTO(
        project_name='project_1',
        full_name='user1/project_1',
        avatar_url='fake_url_1',
        description='description1_updated',
        homepage='https://fake_homepage.com',
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
        topic='feminism',
        sorting=0
    ),
    github_project.GithubProjectDTO(
        project_name='project_2',
        full_name='user2/project_2',
        avatar_url='fake_url_2',
        description='description2_updated',
        homepage='https://fake_homepage.com',
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
        topic='feminism',
        sorting=0
    )
]

github_project_null_language = [
    github_project.GithubProjectDTO(
        project_name='project_1',
        full_name='user1/project_1',
        avatar_url='fake_url_1',
        description='description1',
        homepage='https://fake_homepage.com',
        contributors=18,
        open_issues=30,
        watchers=15,
        stargazers=25,
        forks=28,
        project_url='url_1',
        pushed='2020-10-13T13:10:42Z',
        created='2019-08-04T05:36:49Z',
        updated='2019-08-06T07:38:15Z',
        language=None,
        total_commits=24,
        commits_graph_data={},
        rate=0.8,
        topic='feminism',
        sorting=0
    )
]


def generate_github_projects_pagination():
    generated_projects = []
    for i in range(1, 15):
        generated_projects.append(
            github_project.GithubProjectDTO(
                project_name=f'project_{i}',
                full_name=f'user2/project_{i}',
                avatar_url=f'fake_url_{i}',
                description=f'description{i}',
                homepage=f'https://fake_homepage_{i}.com',
                contributors=i,
                open_issues=239,
                watchers=34,
                stargazers=29,
                forks=0,
                project_url='url_2',
                pushed='2019-08-13T11:12:55Z',
                created='2019-08-13T11:01:35Z',
                updated='2019-08-13T11:12:55Z',
                language=f'fake_language_{i}',
                total_commits=i,
                commits_graph_data={},
                rate=f'0.{i}',
                topic=f'topic_{i}',
                sorting=0
            )
        )

    return generated_projects


topics = {
    'name': 'topics',
    'topics': ['fake_topic_1']
}

languages = {
    '_id': 'languages',
    'name': 'languages',
    'languages': ['fake_language_1']
}

fake_credentials = {
    'AccessKeyId': 'fake_access_key',
    'SecretAccessKey': 'fake_secret_access_key',
    'SessionToken': 'fake_session_token',
    'Expiration': datetime.datetime(2024, 11, 20, 12, 00).timestamp()
}
