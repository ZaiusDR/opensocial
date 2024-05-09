import json
import os

import boto3
import pymongo


def save_projects(projects):
    # TODO: Migrate the full_name to _id field for MongoDB
    projects_as_dicts = [project._asdict() for project in projects]
    [project.update({'_id': project['full_name']}) for project in projects_as_dicts]
    mongo_client = _get_connection()
    db = mongo_client.get_database('open-social')
    projects_collection = db.get_collection('projects')
    projects_collection.insert_many(projects_as_dicts)


def _get_connection():
    sts_client = boto3.client('sts')

    response = sts_client.assume_role(
        RoleArn='arn:aws:iam::326499071401:role/mongo-db-rw',
        RoleSessionName='AssumeRole'
    )
    os.environ['AWS_ACCESS_KEY_ID'] = response['Credentials']['AccessKeyId']
    os.environ['AWS_SECRET_ACCESS_KEY'] = response['Credentials']['SecretAccessKey']
    os.environ['AWS_SESSION_TOKEN'] = response['Credentials']['SessionToken']

    secrets_manager_client = boto3.client('secretsmanager')
    secret_data = secrets_manager_client.get_secret_value(SecretId='mongodb-uri')
    uri = json.loads(secret_data['SecretString'])['mongo_db_uri']

    return pymongo.MongoClient(uri)
