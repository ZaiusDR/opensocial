from domain import github_project


def parse_project_activity(project):
    return github_project.GithubProject(
        project_name=project['name'],
        full_name=project['full_name'],
        stargazers=project['stargazers_count'],
        project_url=project['html_url']
    )
