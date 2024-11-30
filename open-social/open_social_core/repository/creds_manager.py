import json
import os
import time

import boto3
import requests

def _get_secret(secret_id):
    secret_cache_endpoint = 'http://localhost:2773/secretsmanager/get'
    headers = {"X-Aws-Parameters-Secrets-Token": os.environ.get('AWS_SESSION_TOKEN')}

    response = requests.get(f'{secret_cache_endpoint}?secretId={secret_id}', headers=headers)
    return json.loads(response.json().get('SecretString'))


def get_connection_string():
    secret_id = 'mongodb-uri'
    return _get_secret(secret_id)['mongo_db_uri']


def get_sts_credentials():
    secret_id = 'mongodb-sts-credentials'
    one_hour_in_secs = 3600

    sts_credentials = _get_secret(secret_id)
    print(type(sts_credentials))

    if sts_credentials['Expiration'] <= time.time():
        sts_client = boto3.client('sts')

        response = sts_client.assume_role(
            RoleArn='arn:aws:iam::326499071401:role/mongo-db-rw',
            RoleSessionName='AssumeRole',
            DurationSeconds=one_hour_in_secs
        )
        sts_credentials = response['Credentials']

        sts_credentials.update({'Expiration': sts_credentials['Expiration'].timestamp()})

        secrets_manager_client = boto3.client('secretsmanager')
        secrets_manager_client.update_secret(
            SecretId=secret_id,
            SecretString=json.dumps(sts_credentials)
        )

    return sts_credentials