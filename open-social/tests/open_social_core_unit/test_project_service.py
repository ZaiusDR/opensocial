import json
import unittest

from unittest import mock

from open_social_core.service import project_service

from tests import fixtures


class TestProjectService(unittest.TestCase):

    @mock.patch('open_social_core.service.project_service.project_repository.save')
    def test_should_save_github_projects(self, repository_mock):
        expected_projects = fixtures.github_projects
        repository_mock.return_value = expected_projects

        projects = project_service.bulk_save(expected_projects)

        repository_mock.assert_called_once_with(expected_projects)
        self.assertEqual(projects, expected_projects)

    @mock.patch('open_social_core.service.project_service.project_repository.get_projects')
    def test_should_return_projects(self, repository_mock):
        expected_projects = [{'full_name': 'project_1'}]
        repository_mock.return_value = expected_projects

        projects = project_service.get_projects()

        repository_mock.assert_called_once()
        self.assertEqual(projects, expected_projects)

    @mock.patch('open_social_core.service.project_service.project_repository.get_projects')
    def test_should_return_projects_with_pagination(self, repository_mock):
        project_service.get_projects(sorted_by=None, page='fake_key')

        repository_mock.assert_called_once_with('fake_key')

    @mock.patch('open_social_core.service.project_service.project_repository.get_sorted_projects')
    def test_should_return_projects_with_sorted_by_total_commits_asc(self, repository_mock):
        project_service.get_projects(sorted_by='total_commits', asc=True, page='fake_key')

        repository_mock.assert_called_once_with('total_commits', True, 'fake_key')

    @mock.patch('open_social_core.service.project_service.project_repository.get_sorted_projects')
    def test_should_return_projects_with_sorted_by_total_commits_desc(self, repository_mock):
        project_service.get_projects(sorted_by='total_commits', asc=False, page='fake_key')

        repository_mock.assert_called_once_with('total_commits', False, 'fake_key')
