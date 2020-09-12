import unittest

import boto3
import moto

from open_social_core.domain import github_project
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
        projects = [
            github_project.GithubProject('project_1', 'user1/project_1', 24, 'url_1'),
            github_project.GithubProject('project_2', 'user2/project_2', 25, 'url_2')
        ]
        expected_project_num = 2
        project_repository.save(projects)

        listed_projects = app.list_projects()

        self.assertEqual(len(listed_projects['Item']), expected_project_num)
