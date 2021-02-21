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
        project_fields = self.projects[0]._fields

        project_repository.save(self.projects)

        response = self.table.get_item(
            Key={
                'full_name': 'user1/project_1'
            }
        )

        self.assertTrue('Item' in response.keys())
        self.assertEqual(list(response['Item'].keys()), list(project_fields))

    def test_should_get_all_projects_with_no_pagination(self):
        project_repository.save(self.projects)

        response = project_repository.get_projects()

        self.assertEqual(len(response['projects']), 2)

    def test_should_get_all_projects_with_pagination(self):
        project_repository.save(fixtures.github_projects_pagination)

        page1 = project_repository.get_projects()
        page2 = project_repository.get_projects(page1['page_identifier'])

        self.assertEqual(len(page1['projects']), 5)
        self.assertEqual(len(page2['projects']), 1)
