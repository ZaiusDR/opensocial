import boto3
import simplejson

from boto3.dynamodb.conditions import Key

TABLE_NAME = 'open-social-projects'


def save(projects):
    table = _get_table()
    for project in projects:
        table.put_item(
            Item={
                'full_name': project.full_name,
                'project_name': project.project_name,
                'avatar_url': project.avatar_url,
                'description': project.description,
                'contributors': project.contributors,
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
                'rate': str(project.rate),
                'sorting': project.sorting,
                'ttl': project.ttl
            }
        )

    return projects


def get_projects(exclusive_start_key=None):
    table = _get_table()
    if exclusive_start_key:
        response = table.scan(Limit=5, ExclusiveStartKey=simplejson.loads(exclusive_start_key))
    else:
        response = table.scan(Limit=5)
    results = {
        'projects': response['Items'],
        'page_identifier': response['LastEvaluatedKey'] if 'LastEvaluatedKey' in response else None
    }
    return results


def get_sorted_projects(sorted_by, scan_index_forward, exclusive_start_key=None):
    sorted_to_index = {
        'total_commits': 'TotalCommitsIndex',
        'contributors': 'ContributorsIndex',
        'rate': 'RateIndex',
    }
    table = _get_table()
    if exclusive_start_key:
        response = table.query(
            IndexName=sorted_to_index[sorted_by],
            KeyConditionExpression=Key('sorting').eq(0),
            Limit=5,
            ScanIndexForward=scan_index_forward,
            ExclusiveStartKey=simplejson.loads(exclusive_start_key)
        )
    else:
        response = table.query(
            IndexName=sorted_to_index[sorted_by],
            KeyConditionExpression=Key('sorting').eq(0),
            Limit=5,
            ScanIndexForward=scan_index_forward
        )
    results = {
        'projects': response['Items'],
        'page_identifier': response['LastEvaluatedKey'] if 'LastEvaluatedKey' in response else None
    }
    return results


def _get_table():
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table(TABLE_NAME)
