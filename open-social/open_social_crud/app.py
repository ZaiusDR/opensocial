import base64
import decimal
import gzip
import io
import json

from service import project_service


def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Hello World!",
        }),
    }


def _gzip_b64encode(data):
    compressed = io.BytesIO()
    with gzip.GzipFile(fileobj=compressed, mode='w') as f:
        json_response = json.dumps(data, default=decimal_default)
        f.write(json_response.encode('utf-8'))
    return base64.b64encode(compressed.getvalue()).decode('ascii')


def list_projects(event, context):
    if 'queryStringParmaters' in event and 'page' in event['queryStringParmaters']:
        projects = project_service.get_projects(event['queryStringParmaters']['page'])
    else:
        projects = project_service.get_projects()

    return {
        'statusCode': 200,
        'isBase64Encoded': True,
        'body': _gzip_b64encode(projects),
        'headers': {
            'Content-Type': 'application/json',
            'Content-Encoding': 'gzip',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Content-Encoding'
        }
    }


def decimal_default(obj):
    if isinstance(obj, decimal.Decimal):
        return int(obj)
    raise TypeError
