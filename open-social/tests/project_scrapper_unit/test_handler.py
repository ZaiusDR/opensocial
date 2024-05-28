import json
import unittest

from unittest import mock

from tests import fixtures

from project_scrapper import app


class TestLambda(unittest.TestCase):

    @mock.patch('project_scrapper.app.github_gateway.get_project_list')
    @mock.patch('project_scrapper.app.repository.save_projects')
    @mock.patch('project_scrapper.app.repository.save_languages')
    @mock.patch('project_scrapper.app.repository.save_topic')
    def test_should_return_a_list_of_saved_projects_using_gql(self, topic_mock, languages_mock, service_mock, gateway_mock):
        gateway_mock.return_value = {}
        event = {'topic': 'humanitarian'}
        expected_projects = fixtures.github_projects
        expected_response = {
            'statusCode': 200, 'body': json.dumps({"projects": expected_projects})
        }
        service_mock.return_value = expected_projects

        projects = app.lambda_handler(event, {})

        gateway_mock.assert_called_once_with(event)
        service_mock.assert_called_once_with({})
        languages_mock.assert_called_once_with({})
        topic_mock.assert_called_once_with(event['topic'])

        self.assertEqual(projects, expected_response)
