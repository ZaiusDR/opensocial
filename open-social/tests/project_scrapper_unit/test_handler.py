import json
import unittest

from unittest import mock

from tests import fixtures

from project_scrapper import app


class TestLambda(unittest.TestCase):

    @mock.patch('project_scrapper.app.github_gateway.get_project_list')
    @mock.patch('project_scrapper.app.project_service.bulk_save')
    def test_should_return_a_list_of_saved_projects(self, service_mock, gateway_mock):
        gateway_mock.return_value = {}
        event = {'q': 'humanitarian'}
        expected_projects = fixtures.github_projects
        expected_response = {
            'statusCode': 200, 'body': json.dumps({"projects": expected_projects})
        }
        service_mock.return_value = expected_projects

        projects = app.lambda_handler(event, {})

        gateway_mock.assert_called_once_with(event)
        service_mock.assert_called_once_with({})

        self.assertEqual(projects, expected_response)

    @mock.patch('project_scrapper.app.github_gateway_gql.get_project_list')
    @mock.patch('project_scrapper.app.project_service.bulk_save')
    def test_should_return_a_list_of_saved_projects_using_gql(self, service_mock, gateway_mock):
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

        self.assertEqual(projects, expected_response)
