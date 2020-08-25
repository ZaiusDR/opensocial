import json
import unittest

from unittest import mock

from project_scrapper import app
from open_social_core.domain import github_project


class TestLambda(unittest.TestCase):

    @mock.patch('project_scrapper.app.github_gateway.get_project_list')
    @mock.patch('project_scrapper.app.project_service.save')
    def test_should_return_a_list_of_saved_projects(self, service_mock, gateway_mock):
        gateway_mock.return_value = {}
        expected_projects = [
            github_project.GithubProject('project_1', 24, 'url_1'),
            github_project.GithubProject('project_2', 25, 'url_2')
        ]
        expected_response = {
            'statusCode': 200, 'body': json.dumps({"projects": expected_projects})
        }
        service_mock.return_value = expected_projects

        projects = app.lambda_handler({}, {})

        gateway_mock.assert_called_once_with()
        service_mock.assert_called_once_with({})

        self.assertEqual(projects, expected_response)
