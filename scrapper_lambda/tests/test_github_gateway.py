import unittest

import responses

from scrapper_lambda.project_scrapper import github_gateway

from scrapper_lambda.tests import constants


class TestGithubAPI(unittest.TestCase):
    @responses.activate
    def test_should_get_a_project_list_from_github(self):
        responses.add(
            responses.GET,
            github_gateway.REPOS_SEARCH_URL,
            body=constants.PROJECT_LIST_RESPONSE,
            status=200
        )

        project_list = github_gateway.get_project_list()

        self.assertEqual(len(responses.calls), 1)
        self.assertEqual(project_list['total_count'], 2)

