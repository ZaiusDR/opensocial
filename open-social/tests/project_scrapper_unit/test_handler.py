import unittest

from unittest import mock

from project_scrapper import handler
from open_social_core.domain import github_project


class TestLambda(unittest.TestCase):

    @mock.patch('project_scrapper.handler.github_gateway.get_project_list')
    @mock.patch('project_scrapper.handler.project_service.save')
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
