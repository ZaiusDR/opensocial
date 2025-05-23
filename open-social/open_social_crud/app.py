import base64
import decimal
import gzip
import io
import json

import pymongo

from repository import repository
from repository import creds_manager


# Defining the DB Client here is recommended for reusing it across lambda executions
mongo_client = None


def _gzip_b64encode(data):
    compressed = io.BytesIO()
    with gzip.GzipFile(fileobj=compressed, mode='w') as f:
        json_response = json.dumps(data, default=decimal_default)
        f.write(json_response.encode('utf-8'))
    return base64.b64encode(compressed.getvalue()).decode('ascii')


def entrypoint(event, context):
    print(event)
    global mongo_client
    if not mongo_client:
        mongo_client = pymongo.MongoClient(creds_manager.get_connection_string())
    response = {}
    if event['path'] == '/projects':
        page = _get_query_parameter(event, 'queryStringParameters', 'page', 0)
        sorted_by = _get_query_parameter(event, 'queryStringParameters', 'sorted_by', None)
        topics = _get_query_parameter(event, 'multiValueQueryStringParameters','topics', None)
        languages = _get_query_parameter(event, 'multiValueQueryStringParameters','languages', None)
        if topics:
            topics = [topic.replace("'", '') for topic in topics]
        if languages:
            languages = [language.replace("'", '') for language in languages]
        response = repository.get_projects(mongo_client, page, sorted_by, topics, languages)

    elif event['path'] == '/autocomplete':
        query = _get_query_parameter(event, 'queryStringParameters', 'query', None)
        response = repository.autocomplete(mongo_client, query)

    elif event['path'] == '/search':
        query = _get_query_parameter(event, 'queryStringParameters', 'query', None)
        response = repository.search_projects(mongo_client, query)

    elif event['path'] == '/topics':
        response = repository.get_topics(mongo_client)

    elif event['path'] == '/languages':
        response = repository.get_languages(mongo_client)

    compressed_body = _gzip_b64encode(response)

    return {
        'statusCode': 200,
        'isBase64Encoded': True,
        'body': compressed_body,
        'headers': {
            'Content-Type': 'application/json',
            'Content-Encoding': 'gzip',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Content-Encoding'
        }
    }


def _get_query_parameter(event, parameters_source, parameter_name, default):
    return event.get(parameters_source, {}) and \
           event.get(parameters_source, {}).get(parameter_name, default)


def decimal_default(obj):
    if isinstance(obj, decimal.Decimal):
        return int(obj)
    raise TypeError
