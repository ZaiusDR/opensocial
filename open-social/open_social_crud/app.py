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


def list_projects(event, context):
    client = boto3.client('dynamodb')
    query_response = client.scan(
        TableName='open-social-projects'
    )

    return {
        "statusCode": 200,
        "body": query_response['Items']
    }
