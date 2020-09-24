import unittest

import boto3
import moto

from tests import fixtures

from open_social_core.repository import project_repository


@moto.mock_dynamodb2
class TestProjectRepository(unittest.TestCase):

    def setUp(self):
        self.projects = fixtures.github_projects

        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.create_table(
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

    def tearDown(self):
        self.table.delete()
        self.dynamodb = None

    def test_should_save_projects(self):
        project_repository.save(self.projects)

        response = self.table.get_item(
            Key={
                'full_name': 'user1/project_1'
            }
        )

        self.assertTrue('Item' in response.keys())

    def test_should_get_all_projects(self):
        project_repository.save(self.projects)

        response = project_repository.get_projects()

        self.assertEqual(len(response), 2)
