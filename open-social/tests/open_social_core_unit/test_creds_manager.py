import json
import unittest

import boto3
import freezegun
import moto
import responses

from open_social_core.repository import creds_manager

from tests import fixtures


@moto.mock_aws
class TestCredsManager(unittest.TestCase):
    def setUp(self):
        self.cache_extension_url = 'http://localhost:2773/secretsmanager/get'
        self.connection_string = 'mongodb://__key_id__:__secret_key__@localhost:27017?authMechanismProperties=AWS_SESSION_TOKEN:__session_token__'  # noqa
        self.fake_credentials = fixtures.fake_credentials

        secret_client = boto3.client('secretsmanager')
        secret_client.create_secret(
            Name='mongodb-sts-credentials',
            SecretString=json.dumps(self.fake_credentials)
        )

    def tearDown(self):
        boto3.client('secretsmanager').delete_secret(SecretId='mongodb-sts-credentials')

    @freezegun.freeze_time('2024-11-19')
    @responses.activate
    def test_should_return_cached_connection_string(self):
        responses.get(
            url=self.cache_extension_url,
            status=200,
            match=[responses.matchers.query_string_matcher("secretId=mongodb-uri")],
            json={'SecretString': f'{{"mongo_db_uri": "{self.connection_string}"}}', 'ARN': 'fake_arn'}
        )
        responses.get(
            url=self.cache_extension_url,
            status=200,
            match=[responses.matchers.query_string_matcher("secretId=mongodb-sts-credentials")],
            json={'SecretString': json.dumps(self.fake_credentials)}
        )

        connection_string = creds_manager.get_connection_string()

        self.assertEqual(
            connection_string,
            f"mongodb://{fixtures.fake_credentials['AccessKeyId']}:"
                f"{fixtures.fake_credentials['SecretAccessKey']}@localhost:27017"
                f"?authMechanismProperties=AWS_SESSION_TOKEN:{fixtures.fake_credentials['SessionToken']}"
        )

    @freezegun.freeze_time('2024-11-19')
    @responses.activate
    def test_should_return_encode_credentials_with_special_characters(self):
        special_chars_credentials = fixtures.fake_credentials.copy()
        special_chars_credentials.update({'AccessKeyId': 'fake_[]$_key_id'})
        expected_key_id = 'fake_%5B%5D%24_key_id'
        responses.get(
            url=self.cache_extension_url,
            status=200,
            match=[responses.matchers.query_string_matcher("secretId=mongodb-uri")],
            json={'SecretString': f'{{"mongo_db_uri": "{self.connection_string}"}}', 'ARN': 'fake_arn'}
        )
        responses.get(
            url=self.cache_extension_url,
            status=200,
            match=[responses.matchers.query_string_matcher("secretId=mongodb-sts-credentials")],
            json={'SecretString': json.dumps(special_chars_credentials)}
        )

        connection_string = creds_manager.get_connection_string()

        self.assertEqual(
            connection_string,
            f"mongodb://{expected_key_id}:"
            f"{special_chars_credentials['SecretAccessKey']}@localhost:27017"
            f"?authMechanismProperties=AWS_SESSION_TOKEN:{special_chars_credentials['SessionToken']}"
        )


    @freezegun.freeze_time('2024-11-21')
    @responses.activate
    def test_should_return_sts_credentials_from_sts_service(self):
        secretsmanager_client = boto3.client('secretsmanager')
        responses.get(
            url=self.cache_extension_url,
            status=200,
            match=[responses.matchers.query_string_matcher("secretId=mongodb-uri")],
            json={'SecretString': f'{{"mongo_db_uri": "{self.connection_string}"}}', 'ARN': 'fake_arn'}
        )
        responses.get(
            url=self.cache_extension_url,
            status=200,
            match=[responses.matchers.query_string_matcher("secretId=mongodb-sts-credentials")],
            json={'SecretString': json.dumps(self.fake_credentials)}
        )

        connection_string = creds_manager.get_connection_string()

        sts_secret = secretsmanager_client.get_secret_value(SecretId='mongodb-sts-credentials')
        sts_new_credentials = json.loads(sts_secret['SecretString'])
        self.assertIn(sts_new_credentials['AccessKeyId'], connection_string)
