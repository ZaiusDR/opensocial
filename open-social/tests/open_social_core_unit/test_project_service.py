import json
import os
import unittest

from unittest import mock

from open_social_core.service import project_service

from tests import fixtures


class TestProjectService(unittest.TestCase):

    @mock.patch('open_social_core.service.project_service.repository.save_projects')
    def test_should_save_github_projects_mongo(self, repository_mock):
        expected_projects = fixtures.github_projects
        repository_mock.return_value = expected_projects

        projects = project_service.bulk_save(expected_projects)

        repository_mock.assert_called_once_with(expected_projects)
        self.assertEqual(projects, expected_projects)

    @mock.patch('open_social_core.service.project_service.repository.get_projects')
    def test_should_get_projects_mongo(self, repository_mock):
        expected_projects = fixtures.github_projects
        repository_mock.return_value = expected_projects

        projects = project_service.get_projects()

        repository_mock.assert_called_once_with(page=0, sorted_by=None)
        self.assertEqual(projects, expected_projects)

    @mock.patch('open_social_core.service.project_service.repository.get_projects')
    def test_should_get_projects_with_sorted_by_mongo(self, repository_mock):
        project_service.get_projects(page=0, sorted_by='total_commits')

        repository_mock.assert_called_once_with(page=0, sorted_by='total_commits')
