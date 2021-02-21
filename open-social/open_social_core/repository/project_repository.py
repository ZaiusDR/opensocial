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
                'commits_graph_data': project.commits_graph_data,
                'archived': project.archived
            }
        )

    return projects


def get_projects(exclusive_start_key=None):
    table = _get_table()
    if exclusive_start_key:
        response = table.scan(Limit=5, ExclusiveStartKey={'full_name': exclusive_start_key})
    else:
        response = table.scan(Limit=5)
    results = {
        'projects': response['Items'],
        'page_identifier': response['LastEvaluatedKey']['full_name'] if 'LastEvaluatedKey' in response else None
    }
    return results


def _get_table():
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table(TABLE_NAME)
