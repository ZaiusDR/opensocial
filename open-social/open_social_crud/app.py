import json

import boto3


from service import project_service


def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Hello World!",
        }),
    }


def list_projects():
    client = boto3.client('dynamodb')
    return client.get_item(
        TableName='open-social-projects',
        Key={
            'full_name': {
                'S': 'user1/project_1'
            }
        }
    )
