import json
import unittest

import mongomock

from unittest import mock

from tests import fixtures

from project_scrapper import app


@mongomock.patch(servers=(('localhost', 27017),))
@mock.patch('open_social_crud.app.creds_manager.get_connection_string', return_value='mongodb://localhost:27017')
class TestLambda(unittest.TestCase):

    def setUp(self):
        self.client = mongomock.MongoClient('localhost', 27017)

    @mock.patch('project_scrapper.app.github_gateway.get_project_list')
    @mock.patch('project_scrapper.app.repository.save_projects')
    @mock.patch('project_scrapper.app.repository.save_languages')
    @mock.patch('project_scrapper.app.repository.save_topic')
    def test_should_return_a_list_of_saved_projects_using_gql(
            self, topics_mock, languages_mock, projects_mock, gateway_mock, mongo_mock
    ):
        gateway_mock.return_value = {}
        event = {'topic': 'humanitarian'}
        expected_projects = len(fixtures.github_projects)
        expected_response = {
            'statusCode': 200, 'body': json.dumps({"projects_updated": expected_projects})
        }
        projects_mock.return_value = expected_projects

        projects = app.lambda_handler(event, {})

        gateway_mock.assert_called_once_with(event)
        projects_mock.assert_called_once_with(self.client, {})
        languages_mock.assert_called_once_with(self.client, {})
        topics_mock.assert_called_once_with(self.client, event['topic'])

        self.assertEqual(projects, expected_response)
