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
        assert project1['full_name'] == fixtures.github_projects[0].full_name
        assert project1['description'] == fixtures.github_projects[0].description

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_update_projects_when_already_exist(self):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        repository.save_projects(fixtures.github_projects)

        repository.save_projects(fixtures.updated_github_projects)

        project1 = db.projects.find_one({'full_name': 'user1/project_1'})
        assert project1['full_name'] == fixtures.github_projects[0].full_name
        assert project1['description'] == fixtures.updated_github_projects[0].description
