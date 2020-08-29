import json
import unittest

from unittest import mock

from open_social_core.service import project_service
from open_social_core.domain import github_project

from tests import constants


class TestProjectService(unittest.TestCase):

    @mock.patch('open_social_core.service.project_service.github_project_parser.parse_project_activity')
    def test_should_parse_all_projects_in_json(self, parser_mock):
        projects_json = json.loads(constants.PROJECT_LIST_RESPONSE)

        project_service.save(projects_json)

        self.assertEqual(parser_mock.call_count, 2)

    @mock.patch('open_social_core.service.project_service.project_repository.save')
    def test_should_save_github_projects(self, repository_mock):
        expected_projects = [
            github_project.GithubProject('project_1', 'user1/project_1', 24, 'url_1'),
            github_project.GithubProject('project_2', 'user2/project_2', 25, 'url_2')
        ]
        repository_mock.return_value = expected_projects

        projects = project_service.save(json.loads(constants.PROJECT_LIST_RESPONSE))

        repository_mock.assert_called_once()
        self.assertEqual(projects, expected_projects)

