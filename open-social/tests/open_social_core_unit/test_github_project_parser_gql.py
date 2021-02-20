import unittest

from open_social_core.infrastructure import github_project_parser_gql

from tests import constants


class TestProjectParser(unittest.TestCase):
    def test_should_parse_project_activity(self):
        project_information = github_project_parser_gql.parse_project_activity(
            constants.PROJECTS['search']['repos'][0]['repo']
        )

        self.assertEqual(project_information.project_name, 'jomarnavarro/pepinazo')
        self.assertEqual(project_information.description, 'Introduces cucumber with page objects.')
        self.assertEqual(project_information.open_issues, 0)
        self.assertEqual(project_information.watchers, 1)
        self.assertEqual(project_information.forks, 81)
        self.assertEqual(project_information.project_url, 'https://github.com/jomarnavarro/pepinazo')
        self.assertEqual(project_information.created, '2019-05-08T23:51:02Z')
        self.assertEqual(project_information.updated, '2021-01-16T01:32:01Z')
        self.assertEqual(project_information.language, 'Java')
        self.assertEqual(project_information.last_commit_dates, ['2020-08-21T19:53:19-04:00', '2021-02-03T10:10:19-06:00']) # noqa
        self.assertEqual(project_information.archived, False)

    def test_should_parse_project_activity_with_zero_commits(self):
        project_information = github_project_parser_gql.parse_project_activity(
            constants.PROJECTS['search']['repos'][1]['repo']
        )

        self.assertEqual(project_information.project_name, 'yukunl/PepinTour')
        self.assertEqual(project_information.last_commit_dates, [])

    def test_should_parse_project_activity_with_null_commits(self):
        project_information = github_project_parser_gql.parse_project_activity(
            constants.PROJECTS['search']['repos'][2]['repo']
        )

        self.assertEqual(project_information.project_name, 'sebLaLa80/pepinierePHP')
        self.assertEqual(project_information.last_commit_dates, [])

