import base64
import decimal
import gzip
import io
import json

from repository import repository


def _gzip_b64encode(data):
    compressed = io.BytesIO()
    with gzip.GzipFile(fileobj=compressed, mode='w') as f:
        json_response = json.dumps(data, default=decimal_default)
        f.write(json_response.encode('utf-8'))
    return base64.b64encode(compressed.getvalue()).decode('ascii')


def entrypoint(event, context):
    print(event)
    response = {}
    if event['path'] == '/projects':
        page = _get_query_parameter(event, 'page', 0)
        sorted_by = _get_query_parameter(event, 'sorted_by', None)

        response = repository.get_projects(page, sorted_by)
    elif event['path'] == '/topics':
        response = repository.get_topics()

    return {
        'statusCode': 200,
        'isBase64Encoded': True,
        'body': _gzip_b64encode(response),
        'headers': {
            'Content-Type': 'application/json',
            'Content-Encoding': 'gzip',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Content-Encoding'
        }
    }


def _get_query_parameter(event, parameter_name, default):
    return event.get('queryStringParameters', {}) and \
           event.get('queryStringParameters', {}).get(parameter_name, default)


def decimal_default(obj):
    if isinstance(obj, decimal.Decimal):
        return int(obj)
    raise TypeError
