import unittest

import freezegun

from open_social_core.infrastructure import github_project_parser

from tests import constants


class TestProjectParser(unittest.TestCase):
    def test_should_parse_project_activity(self):
        project_information = github_project_parser.parse_project_activity(
            constants.PROJECTS_FIRST_PAGE['search']['repos'][0]['repo']
        )

        self.assertEqual(project_information.project_name, 'pepinazo')
        self.assertEqual(project_information.full_name, 'jomarnavarro/pepinazo')
        self.assertEqual(project_information.description, 'Introduces cucumber with page objects.')
        self.assertEqual(project_information.open_issues, 0)
        self.assertEqual(project_information.watchers, 1)
        self.assertEqual(project_information.stargazers, 71)
        self.assertEqual(project_information.forks, 81)
        self.assertEqual(project_information.project_url, 'https://github.com/jomarnavarro/pepinazo')
        self.assertEqual(project_information.pushed, '2020-10-13T13:10:42Z')
        self.assertEqual(project_information.created, '2019-05-08T23:51:02Z')
        self.assertEqual(project_information.updated, '2021-01-16T01:32:01Z')
        self.assertEqual(project_information.language, 'Java')
        self.assertEqual(project_information.total_commits, 2)
        self.assertEqual(project_information.archived, 0)

    def test_should_parse_project_activity_with_no_primary_language(self):
        project_information = github_project_parser.parse_project_activity(
            constants.PROJECTS_FIRST_PAGE['search']['repos'][1]['repo']
        )

        self.assertEqual(project_information.project_name, 'PepinTour')
        self.assertEqual(project_information.language, None)

    @freezegun.freeze_time('2021-02-21')
    def test_should_correctly_generate_commits_graph_data(self):
        expected_commit_graph_data = [
            {'month': '2020-09', 'commits': 3},
            {'month': '2020-10', 'commits': 1},
            {'month': '2020-11', 'commits': 0},
            {'month': '2020-12', 'commits': 1},
            {'month': '2021-01', 'commits': 1},
            {'month': '2021-02', 'commits': 2},
        ]

        project_information = github_project_parser.parse_project_activity(
            constants.PROJECTS_SECOND_PAGE['search']['repos'][0]['repo']
        )

        self.assertEqual(project_information.project_name, 'pepiniereLabranche')
        self.assertEqual(project_information.commits_graph_data, expected_commit_graph_data)

    @freezegun.freeze_time('2021-02-21')
    def test_should_correctly_generate_commits_graph_data_when_no_commits(self):
        expected_commit_graph_data = [
            {'month': '2020-09', 'commits': 0},
            {'month': '2020-10', 'commits': 0},
            {'month': '2020-11', 'commits': 0},
            {'month': '2020-12', 'commits': 0},
            {'month': '2021-01', 'commits': 0},
            {'month': '2021-02', 'commits': 0},
        ]

        project_information = github_project_parser.parse_project_activity(
            constants.PROJECTS_FIRST_PAGE['search']['repos'][2]['repo']
        )

        self.assertEqual(project_information.project_name, 'pepinierePHP')
        self.assertEqual(project_information.commits_graph_data, expected_commit_graph_data)
