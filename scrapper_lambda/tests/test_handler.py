import unittest

from unittest import mock

from scrapper_lambda.project_scrapper import handler
from scrapper_lambda.project_scrapper import github_project


class TestLambda(unittest.TestCase):

    @mock.patch('scrapper_lambda.project_scrapper.github_gateway.get_project_list')
    @mock.patch('scrapper_lambda.project_scrapper.project_service.save')
    def test_should_return_a_list_of_saved_projects(self, service_mock, gateway_mock):
        gateway_mock.return_value = {}
        expected_projects = [
            github_project.GithubProject('project_1', 24, 'url_1'),
            github_project.GithubProject('project_2', 25, 'url_2')
        ]
        service_mock.return_value = expected_projects

        projects = handler.lambda_handler({}, {})

        gateway_mock.assert_called_once_with()
        service_mock.assert_called_once_with({})

        self.assertEqual(projects, expected_projects)
