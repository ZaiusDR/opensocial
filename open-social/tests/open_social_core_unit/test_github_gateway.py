import unittest

import freezegun
import responses

from open_social_core.infrastructure import github_gateway

from tests import constants


class TestGithubAPI(unittest.TestCase):

    @freezegun.freeze_time('2021-02-15')
    @responses.activate
    def test_should_get_a_project_list_from_github_with_pagination(self):
        query = {'q': 'fake_query'}
        repos_url = f'{github_gateway.REPOS_SEARCH_URL}?q=fake_query&sort=updated&per_page=50'
        repos_url_next = f'{github_gateway.REPOS_SEARCH_URL}?q=fake_query&sort=updated&per_page=50&page=2'
        repo1_commits_url = 'https://api.github.com/repos/HTBox/crisischeckin/commits'
        repo2_commits_url = 'https://api.github.com/repos/kobotoolbox/kobocat/commits'
        responses.add(
            responses.GET,
            url=repos_url,
            body=constants.PROJECT_LIST_RESPONSE,
            status=200,
            match_querystring=True,
            headers=constants.SAMPLE_HEADER
        )
        responses.add(
            responses.GET,
            url=repos_url_next,
            body=constants.OUTDATED_PROJECT_LIST_RESPONSE,
            status=200,
            match_querystring=True,
            headers=constants.SAMPLE_HEADER
        )
        responses.add(
            responses.GET,
            url=repo1_commits_url,
            body=constants.SAMPLE_COMMITS,
            status=200
        )
        responses.add(
            responses.GET,
            url=repo2_commits_url,
            body=constants.SAMPLE_COMMITS,
            status=200
        )

        project_list = github_gateway.get_project_list(query)

        self.assertEqual(len(responses.calls), 6)
        self.assertEqual(responses.calls[0].request.url, repos_url)
        self.assertEqual(responses.calls[1].request.url, repo1_commits_url)
        self.assertEqual(responses.calls[2].request.url, repo2_commits_url)
        self.assertEqual(responses.calls[3].request.url, repos_url_next)
        self.assertEqual(len(project_list), 4)

