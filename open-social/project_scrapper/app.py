import json
import os

import boto3
import pymongo

from infrastructure import github_gateway
from service import project_service


def _test_mongo_connection():
    sts_client = boto3.client('sts')

    response = sts_client.assume_role(
        RoleArn='arn:aws:iam::326499071401:role/mongo-db-rw',
        RoleSessionName='AssumeRole'
    )
    os.environ['AWS_ACCESS_KEY_ID'] = response['Credentials']['AccessKeyId']
    os.environ['AWS_SECRET_ACCESS_KEY'] = response['Credentials']['SecretAccessKey']
    os.environ['AWS_SESSION_TOKEN'] = response['Credentials']['SessionToken']

    secrets_manager_client = boto3.client('secretsmanager')
    uri = secrets_manager_client.get_secret_value(SecretId='mongodb-uri')

    mongo_client = pymongo.MongoClient(uri)
    db = mongo_client.get_database('open-social')
    projects = db.get_collection('projects')
    result = projects.find_one({'_id': "pepin"})
    print(result)


def lambda_handler(event, context):
    if event['topic'] == 'test':
        _test_mongo_connection()
        return
    github_projects = github_gateway.get_project_list(event)
    projects = project_service.bulk_save(github_projects)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "projects": projects,
        }),
    }
