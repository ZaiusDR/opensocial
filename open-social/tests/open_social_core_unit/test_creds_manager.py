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
        self.fake_credentials = fixtures.fake_credentials

        secret_client = boto3.client('secretsmanager')
        secret_client.create_secret(
            Name='mongodb-sts-credentials',
            SecretString=json.dumps(self.fake_credentials)
        )

    def tearDown(self):
        boto3.client('secretsmanager').delete_secret(SecretId='mongodb-sts-credentials')

    @responses.activate
    def test_should_return_mongodb_connection_string(self):
        responses.get(
            url=self.cache_extension_url,
            status=200,
            match=[responses.matchers.query_string_matcher("secretId=mongodb-uri")],
            json={'SecretString': '{"mongo_db_uri": "mongodb://localhost:27017"}', 'ARN': 'fake_arn'}
        )

        connection_string = creds_manager.get_connection_string()

        self.assertEqual(connection_string, 'mongodb://localhost:27017')

    @freezegun.freeze_time('2024-11-19')
    @responses.activate
    def test_should_return_sts_credentials_from_cache(self):
        responses.get(
            url=self.cache_extension_url,
            status=200,
            match=[responses.matchers.query_string_matcher("secretId=mongodb-sts-credentials")],
            json={'SecretString': json.dumps(self.fake_credentials)}
        )

        sts_credentials = creds_manager.get_sts_credentials()

        self.assertEqual(sts_credentials, self.fake_credentials)


    @freezegun.freeze_time('2024-11-21')
    @responses.activate
    def test_should_return_sts_credentials_from_sts_service(self):
        secretsmanager_client = boto3.client('secretsmanager')
        responses.get(
            url=self.cache_extension_url,
            status=200,
            match=[responses.matchers.query_string_matcher("secretId=mongodb-sts-credentials")],
            json={'SecretString': json.dumps(self.fake_credentials)}
        )

        sts_credentials = creds_manager.get_sts_credentials()

        self.assertIn('AccessKeyId', sts_credentials.keys())
        self.assertIn('SecretAccessKey', sts_credentials.keys())
        self.assertIn('SessionToken', sts_credentials.keys())
        self.assertIn('Expiration', sts_credentials.keys())

        self.assertTrue(
            secretsmanager_client.get_secret_value(SecretId='mongodb-sts-credentials'),
            sts_credentials
        )
