import unittest

import boto3
import moto

from open_social_core.domain import github_project
from open_social_core.repository import project_repository


class TestProjectRepository(unittest.TestCase):

    @moto.mock_dynamodb2
    def test_should_save_projects(self):
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

        project_repository.save(projects)

        response = client.get_item(
            TableName='open-social-projects',
            Key={
                'full_name': {
                    'S': 'user1/project_1'
                }
            }
        )

        self.assertTrue('Item' in response.keys())
