import unittest

from unittest import mock

import boto3
import gql
import moto

from open_social_core.infrastructure import github_gateway

from tests import constants


@moto.mock_ssm
class TestGithubAPI(unittest.TestCase):

    @mock.patch('infrastructure.github_gateway.github_project_parser.parse_project_activity')
    @mock.patch.object(gql.Client, 'execute')
    def test_should_get_a_project_list_from_github_with_pagination(self, gql_mock, parser_mock):
        client = boto3.client('ssm', region_name='eu-west-1')
        client.put_parameter(
            Name=github_gateway.TOKEN_PATH, Description='Fake Token', Value='value', Type='SecureString'
        )
        gql_mock.return_value = constants.PROJECTS
        topic = {'topic': 'fake_topic'}

        project_list = github_gateway.get_project_list(topic)

        gql_mock.assert_called_once()
        self.assertEqual(parser_mock.call_count, 4)
        self.assertEqual(len(project_list), 4)
