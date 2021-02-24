from datetime import datetime
from dateutil import relativedelta

import boto3
import gql

from gql.transport.requests import RequestsHTTPTransport

from infrastructure import github_queries
from infrastructure import github_project_parser


API_URL = 'https://api.github.com/graphql'
TOKEN_PATH = '/github/open-social-token'


def get_project_list(topic):
    date_limit = _get_date_limit()
    query = (
        '{0} in:name,description '
        'pushed:>{1} '
        'sort:pushedAt '
        'archived:false'
    ).format(topic['topic'], date_limit)

    gql_query_params = {
        'query': query,
        'date_limit': date_limit
    }

    transport = RequestsHTTPTransport(
        url=API_URL,
        verify=True,
        retries=3,
        headers={'Authorization': 'bearer {0}'.format(_get_token())}
    )

    client = gql.Client(transport=transport)

    has_next_page = True
    projects = []
    gql_query = gql.gql(github_queries.initial_query)
    while has_next_page:
        result = client.execute(gql_query, variable_values=gql_query_params)
        projects.extend(_parse_projects(result))
        if not _has_next_page(result):
            has_next_page = False
        else:
            gql_query_params.update(after=_get_next_page_marker(result))
    return projects


def _parse_projects(result):
    parsed_projects = []
    for project in result['search']['repos']:
        parsed_project = github_project_parser.parse_project_activity(project['repo'])
        parsed_projects.append(parsed_project)
    return parsed_projects


def _get_date_limit():
    return (datetime.now().replace(microsecond=0)
            - relativedelta.relativedelta(months=6)).isoformat()


def _get_token():
    client = boto3.client('ssm', 'eu-west-1')
    return client.get_parameter(
        Name=TOKEN_PATH,
        WithDecryption=True
    )['Parameter']['Value']


def _has_next_page(result):
    return result['search']['pageInfo']['hasNextPage']


def _get_next_page_marker(result):
    return result['search']['pageInfo']['endCursor']
