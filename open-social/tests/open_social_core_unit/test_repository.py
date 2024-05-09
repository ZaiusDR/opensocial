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

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_store_projects(self):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        github_projects_as_dicts = [project._asdict() for project in fixtures.github_projects]
        [project.update({'_id': project['full_name']}) for project in github_projects_as_dicts]

        repository.save_projects(fixtures.github_projects)

        projects = [project for project in db.projects.find()]
        assert projects == github_projects_as_dicts
