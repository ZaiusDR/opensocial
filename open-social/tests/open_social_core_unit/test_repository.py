import unittest

import boto3
import mongomock
import moto
import pymongo

from open_social_core.repository import repository

from tests import fixtures


@moto.mock_sts
@moto.mock_secretsmanager
class TestRepository(unittest.TestCase):

    def setUp(self):
        secret_client = boto3.client('secretsmanager')
        secret_client.create_secret(Name='mongodb-uri', SecretString='{"mongo_db_uri": "mongodb://localhost:27017"}')

    def tearDown(self):
        boto3.client('secretsmanager').delete_secret(SecretId='mongodb-uri')

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_store_projects(self):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')

        repository.save_projects(fixtures.github_projects)

        project1 = db.projects.find_one({'full_name': 'user1/project_1'})
        self.assertEqual(project1['full_name'], fixtures.github_projects[0].full_name)
        self.assertEqual(project1['description'], fixtures.github_projects[0].description)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_update_projects_when_already_exist(self):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        repository.save_projects(fixtures.github_projects)

        repository.save_projects(fixtures.updated_github_projects)

        project1 = db.projects.find_one({'full_name': 'user1/project_1'})
        self.assertEqual(project1['full_name'], fixtures.github_projects[0].full_name)
        self.assertEqual(project1['description'], fixtures.updated_github_projects[0].description)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_get_projects_without_pagination(self):
        repository.save_projects(fixtures.github_projects)

        page_1 = repository.get_projects()

        self.assertEqual(len(page_1['projects']), 2)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_get_projects_with_pagination(self):
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page_1 = repository.get_projects(page=0)
        page_2 = repository.get_projects(page=1)

        self.assertEqual(len(page_1['projects']), 12)
        self.assertEqual(len(page_2['projects']), 2)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_get_projects_sorted_by_total_commits_desc(self):
        sorted_by = 'total_commits'
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(page=0, sorted_by=sorted_by)
        page2 = repository.get_projects(page=1, sorted_by=sorted_by)

        print(page1)

        self.assertEqual(page1['projects'][0]['total_commits'], 14)
        self.assertEqual(page1['projects'][1]['total_commits'], 13)
        self.assertEqual(len(page1['projects']), 12)
        self.assertEqual(len(page2['projects']), 2)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_get_projects_sorted_by_contributors_desc(self):
        sorted_by = 'contributors'
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(page=0, sorted_by=sorted_by)
        repository.get_projects(page=1, sorted_by=sorted_by)

        self.assertEqual(page1['projects'][0]['contributors'], 14)
        self.assertEqual(page1['projects'][1]['contributors'], 13)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_return_projects_sorted_by_rate_desc(self):
        sorted_by = 'rate'
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(page=0, sorted_by=sorted_by)
        repository.get_projects(page=1, sorted_by=sorted_by)

        self.assertEqual(page1['projects'][0]['rate'], '0.9')
        self.assertEqual(page1['projects'][1]['rate'], '0.8')
