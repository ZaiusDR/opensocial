import json
import unittest

from open_social_core.service import github_project_parser

from tests import constants


class TestProjectParser(unittest.TestCase):
    def test_should_parse_project_activity(self):
        project_information = github_project_parser.parse_project_activity(
            json.loads(constants.PROJECT_LIST_RESPONSE)['items'][0]
        )

        self.assertEqual(project_information.project_name, 'crisischeckin')
        self.assertEqual(project_information.stargazers, 177)
        self.assertEqual(project_information.watchers, 177)
        self.assertEqual(project_information.project_url, 'https://github.com/HTBox/crisischeckin')
        self.assertEqual(project_information.created, '2013-07-24T14:14:46Z')
        self.assertEqual(project_information.updated, '2020-04-07T23:08:23Z')
