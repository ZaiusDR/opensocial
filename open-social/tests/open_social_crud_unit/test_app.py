import decimal
import unittest

from unittest import mock

import boto3
import moto

from tests import fixtures

from open_social_core.repository import project_repository
from open_social_crud import app


class TestApp(unittest.TestCase):

    @moto.mock_dynamodb
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
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 123,
                'WriteCapacityUnits': 123
            }
        )
        projects = fixtures.github_projects
        project_repository.save(projects)

        response = app.list_projects({'queryStringParameters': None}, {})

        self.assertEqual(response['statusCode'], 200)
        # self.assertEqual(len(json.loads(response['body'])), 2)

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.project_service.get_projects')
    def test_should_get_projects_with_pagination(self, project_service_mock, b64encode_mock):
        app.list_projects({'queryStringParameters': {'page': 'fake_page'}}, {})

        project_service_mock.assert_called_once_with(None, False, 'fake_page')

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.project_service.get_projects')
    def test_should_get_projects_sorted_by_asc(self, project_service_mock, b64encode_mock):
        app.list_projects(
            {
                'queryStringParameters': {
                    'page': 'fake_page',
                    'sorted_by': 'total_commits',
                    'asc': True
                }
            },
            {}
        )

        project_service_mock.assert_called_once_with('total_commits', True, 'fake_page')

    def test_should_convert_decimal_to_integer(self):
        converted = app.decimal_default(decimal.Decimal(3))

        self.assertIsInstance(converted, int)
