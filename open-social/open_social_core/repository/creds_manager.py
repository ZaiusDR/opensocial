import enum
import json
import os
import time

import boto3
import requests


_CONNECTION_STRING_CACHE = None
_STS_CREDENTIALS_CACHE = None
_STS_REFRESH_BUFFER_SECS = 300


def clear_caches():
    global _CONNECTION_STRING_CACHE, _STS_CREDENTIALS_CACHE
    _CONNECTION_STRING_CACHE = None
    _STS_CREDENTIALS_CACHE = None


class Placeholders(enum.Enum):
    KEY_ID = '__key_id__'
    SECRET_KEY = '__secret_key__'
    SESSION_TOKEN = '__session_token__'


def _get_secret(secret_id):
    secret_cache_endpoint = 'http://localhost:2773/secretsmanager/get'
    headers = {"X-Aws-Parameters-Secrets-Token": os.environ.get('AWS_SESSION_TOKEN')}

    response = requests.get(f'{secret_cache_endpoint}?secretId={secret_id}', headers=headers)
    secret_string = response.json().get('SecretString')

    return json.loads(secret_string)


def _url_encode(credential):
    return requests.utils.quote(credential, safe='')


def _replace_placeholder(connection_string, placeholder, credential):
    return connection_string.replace(placeholder, _url_encode(credential))


def _build_connection_string(connection_string, sts_credentials):
    connection_string = _replace_placeholder(
        connection_string, Placeholders.KEY_ID.value, sts_credentials['AccessKeyId']
    )
    connection_string = _replace_placeholder(
        connection_string, Placeholders.SECRET_KEY.value, sts_credentials['SecretAccessKey']
    )
    connection_string = _replace_placeholder(
        connection_string, Placeholders.SESSION_TOKEN.value, sts_credentials['SessionToken']
    )

    return connection_string


def get_connection_string():
    global _CONNECTION_STRING_CACHE

    if _CONNECTION_STRING_CACHE is None:
        secret_id = 'mongodb-uri'
        _CONNECTION_STRING_CACHE = _get_secret(secret_id)['mongo_db_uri']

    sts_credentials = _get_sts_credentials()
    encoded_connection_string = _build_connection_string(_CONNECTION_STRING_CACHE, sts_credentials)

    return encoded_connection_string


def _get_sts_credentials():
    global _STS_CREDENTIALS_CACHE

    secret_id = 'mongodb-sts-credentials'
    now = time.time()

    if _STS_CREDENTIALS_CACHE is not None:
        expiration = _STS_CREDENTIALS_CACHE.get('Expiration')
        if expiration is not None and expiration > (now + _STS_REFRESH_BUFFER_SECS):
            return _STS_CREDENTIALS_CACHE

    sts_credentials = _get_secret(secret_id)

    if sts_credentials.get('Expiration') is None or sts_credentials['Expiration'] <= now:
        sts_client = boto3.client('sts')

        response = sts_client.assume_role(
            RoleArn='arn:aws:iam::326499071401:role/mongo-db-rw',
            RoleSessionName='AssumeRole',
            DurationSeconds=3600
        )
        sts_credentials = response['Credentials']
        sts_credentials.update({'Expiration': sts_credentials['Expiration'].timestamp()})

        secrets_manager_client = boto3.client('secretsmanager')
        secrets_manager_client.put_secret_value(
            SecretId=secret_id,
            SecretString=json.dumps(sts_credentials)
        )

    _STS_CREDENTIALS_CACHE = sts_credentials
    return _STS_CREDENTIALS_CACHE
