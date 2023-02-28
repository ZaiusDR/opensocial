import unittest

import boto3
import moto
import simplejson

from tests import fixtures

from open_social_core.repository import project_repository


@moto.mock_dynamodb
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
                },
                {
                    'AttributeName': 'sorting',
                    'AttributeType': 'N'
                },
                {
                    'AttributeName': 'total_commits',
                    'AttributeType': 'N'
                },
                {
                    'AttributeName': 'contributors',
                    'AttributeType': 'N'
                },
                {
                    'AttributeName': 'rate',
                    'AttributeType': 'S'
                }
            ],
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'TotalCommitsIndex',
                    'KeySchema': [
                        {
                            'AttributeName': 'sorting',
                            'KeyType': 'HASH'
                        },
                        {
                            'AttributeName': 'total_commits',
                            'KeyType': 'RANGE'
                        }
                    ],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    }
                },
                {
                    'IndexName': 'ContributorsIndex',
                    'KeySchema': [
                        {
                            'AttributeName': 'sorting',
                            'KeyType': 'HASH'
                        },
                        {
                            'AttributeName': 'contributors',
                            'KeyType': 'RANGE'
                        }
                    ],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    }
                },
                {
                    'IndexName': 'RateIndex',
                    'KeySchema': [
                        {
                            'AttributeName': 'sorting',
                            'KeyType': 'HASH'
                        },
                        {
                            'AttributeName': 'rate',
                            'KeyType': 'RANGE'
                        }
                    ],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    }
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 123,
                'WriteCapacityUnits': 123
            }
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
        project_repository.save(fixtures.generate_github_projects_pagination())

        page1 = project_repository.get_projects()
        page2 = project_repository.get_projects(simplejson.dumps(page1['page_identifier']))

        self.assertEqual(len(page1['projects']), 12)
        self.assertEqual(len(page2['projects']), 2)

    def test_should_return_projects_sorted_by_total_commits_desc(self):
        sorted_by = 'total_commits'
        project_repository.save(fixtures.generate_github_projects_pagination())

        page1 = project_repository.get_sorted_projects(sorted_by, False)
        page2 = project_repository.get_sorted_projects(sorted_by, False, simplejson.dumps(page1['page_identifier']))

        self.assertEqual(page1['projects'][0]['total_commits'], 14)
        self.assertEqual(page1['projects'][1]['total_commits'], 13)
        self.assertEqual(len(page1['projects']), 12)
        self.assertEqual(len(page2['projects']), 2)

    def test_should_return_projects_sorted_by_total_commits_asc(self):
        sorted_by = 'total_commits'
        project_repository.save(fixtures.generate_github_projects_pagination())

        page1 = project_repository.get_sorted_projects(sorted_by, True)
        project_repository.get_sorted_projects(sorted_by, True, simplejson.dumps(page1['page_identifier']))

        self.assertEqual(page1['projects'][0]['total_commits'], 1)
        self.assertEqual(page1['projects'][1]['total_commits'], 2)

    def test_should_return_projects_sorted_by_contributors_desc(self):
        sorted_by = 'contributors'
        project_repository.save(fixtures.generate_github_projects_pagination())

        page1 = project_repository.get_sorted_projects(sorted_by, False)
        project_repository.get_sorted_projects(sorted_by, False, simplejson.dumps(page1['page_identifier']))

        self.assertEqual(page1['projects'][0]['contributors'], 14)
        self.assertEqual(page1['projects'][1]['contributors'], 13)

    def test_should_return_projects_sorted_by_rate_asc(self):
        sorted_by = 'rate'
        project_repository.save(fixtures.generate_github_projects_pagination())

        page1 = project_repository.get_sorted_projects(sorted_by, True)
        project_repository.get_sorted_projects(sorted_by, True, simplejson.dumps(page1['page_identifier']))

        self.assertEqual(page1['projects'][0]['rate'], '0.1')
        self.assertEqual(page1['projects'][1]['rate'], '0.10')

    def test_should_return_projects_sorted_by_rate_desc(self):
        sorted_by = 'rate'
        project_repository.save(fixtures.generate_github_projects_pagination())

        page1 = project_repository.get_sorted_projects(sorted_by, False)
        project_repository.get_sorted_projects(sorted_by, False, simplejson.dumps(page1['page_identifier']))

        self.assertEqual(page1['projects'][0]['rate'], '0.9')
        self.assertEqual(page1['projects'][1]['rate'], '0.8')
