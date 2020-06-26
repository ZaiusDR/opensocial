import json
import unittest

from scrapper_lambda.project_scrapper import github_project_parser

from scrapper_lambda.tests import constants


class TestProjectParser(unittest.TestCase):
    def test_should_parse_project_activity(self):
        project_information = github_project_parser.parse_project_activity(
            json.loads(constants.PROJECT_LIST_RESPONSE)['items'][0]
        )

        self.assertEqual(project_information.project_name, 'crisischeckin')
        self.assertEqual(project_information.stargazers, 177)
        self.assertEqual(project_information.project_url, 'https://github.com/HTBox/crisischeckin')
