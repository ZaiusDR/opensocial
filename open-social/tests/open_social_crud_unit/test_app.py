import decimal
import unittest
import json

import boto3
import moto

from tests import fixtures

from open_social_core.repository import project_repository
from open_social_crud import app


class TestApp(unittest.TestCase):

    @moto.mock_dynamodb2
    def test_should_return_a_list_of_projects(self):
        client = boto3.client('dynamodb')
        client.create_table(
            TableName='open-social-projects',
            KeySchema=[
                {
                    'AttributeName': 'full_name',
                    'KeyType': 'HASH'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'full_name',
                    'AttributeType': 'S'
                }
            ]
        )
        projects = fixtures.github_projects
        project_repository.save(projects)

        response = app.list_projects({}, {})

        self.assertEqual(response['statusCode'], 200)
        self.assertEqual(len(json.loads(response['body'])), 2)

    def test_should_convert_decimal_to_integer(self):
        converted = app.decimal_default(decimal.Decimal(3))

        self.assertTrue(isinstance(converted, int))
