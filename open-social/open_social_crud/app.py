import base64
import decimal
import gzip
import io
import json
import time

from repository import repository


def _gzip_b64encode(data):
    compress_start = time.time()
    compressed = io.BytesIO()
    with gzip.GzipFile(fileobj=compressed, mode='w') as f:
        json_response = json.dumps(data, default=decimal_default)
        f.write(json_response.encode('utf-8'))
    compress_end = time.time()
    print("Compress:", compress_end - compress_start)
    return base64.b64encode(compressed.getvalue()).decode('ascii')


def entrypoint(event, context):
    total_start = time.time()
    print(event)
    response = {}
    if event['path'] == '/projects':
        projects_start = time.time()
        page = _get_query_parameter(event, 'queryStringParameters', 'page', 0)
        sorted_by = _get_query_parameter(event, 'queryStringParameters', 'sorted_by', None)
        topics = _get_query_parameter(event, 'multiValueQueryStringParameters','topics', None)
        languages = _get_query_parameter(event, 'multiValueQueryStringParameters','languages', None)
        if topics:
            topics = [topic.replace("'", '') for topic in topics]
        if languages:
            languages = [language.replace("'", '') for language in languages]

        repository_start = time.time()
        response = repository.get_projects(page, sorted_by, topics, languages)
        repository_end = time.time()
        print('Repository:', repository_end - repository_start)
        projects_end = time.time()
        print('Projects:', projects_end - projects_start)
    if event['path'] == '/search':
        query = _get_query_parameter(event, 'queryStringParameters', 'query', None)
        response = repository.search_projects(query)
    elif event['path'] == '/topics':
        response = repository.get_topics()
    elif event['path'] == '/languages':
        response = repository.get_languages()

    compressed_body = _gzip_b64encode(response)
    total_end = time.time()
    print('Total:', total_end  - total_start)

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
