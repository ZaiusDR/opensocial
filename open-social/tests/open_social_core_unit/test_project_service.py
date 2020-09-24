import json
import unittest

from unittest import mock

from open_social_core.service import project_service

from tests import constants
from tests import fixtures


class TestProjectService(unittest.TestCase):

    @mock.patch('open_social_core.service.project_service.github_project_parser.parse_project_activity')
    @mock.patch('open_social_core.service.project_service.project_repository.save')
    def test_should_parse_all_projects_in_json(self, repository_mock, parser_mock):
        projects_json = json.loads(constants.PROJECT_LIST_RESPONSE)

        project_service.save(projects_json)

        self.assertEqual(parser_mock.call_count, 2)

    @mock.patch('open_social_core.service.project_service.project_repository.save')
    def test_should_save_github_projects(self, repository_mock):
        expected_projects = fixtures.github_projects
        repository_mock.return_value = expected_projects

        projects = project_service.save(json.loads(constants.PROJECT_LIST_RESPONSE))

        repository_mock.assert_called_once()
        self.assertEqual(projects, expected_projects)

    @mock.patch('open_social_core.service.project_service.project_repository.get_projects')
    def test_should_return_all_projects(self, repository_mock):
        expected_projects = [{'full_name': 'project_1'}]
        repository_mock.return_value = expected_projects

        projects = project_service.get_projects()

        repository_mock.assert_called_once()
        self.assertEqual(projects, expected_projects)
