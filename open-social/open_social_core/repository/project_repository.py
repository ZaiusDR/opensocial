import boto3

TABLE_NAME = 'open-social-projects'


def save(projects):
    table = _get_table()
    for project in projects:
        table.put_item(
            Item={
                'full_name': project.full_name,
                'project_name': project.project_name,
                'description': project.description,
                'open_issues': project.open_issues,
                'watchers': project.watchers,
                'stargazers': project.stargazers,
                'forks': project.forks,
                'project_url': project.project_url,
                'pushed': project.pushed,
                'created': project.created,
                'updated': project.updated,
                'language': project.language,
                'total_commits': project.total_commits,
                'last_commit_dates': project.last_commit_dates,
                'archived': project.archived
            }
        )

    return projects


def get_projects():
    table = _get_table()
    return table.scan()['Items']


def _get_table():
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table(TABLE_NAME)
