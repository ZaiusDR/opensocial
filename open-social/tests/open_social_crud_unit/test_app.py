import decimal
import unittest

from unittest import mock

import mongomock
from open_social_crud import app


@mongomock.patch(servers=(('localhost', 27017),))
@mock.patch('open_social_crud.app.creds_manager.get_connection_string', return_value='mongodb://localhost:27017')
class TestApp(unittest.TestCase):

    def setUp(self):
        self.client = mongomock.MongoClient('localhost', 27017)

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.repository.get_projects')
    def test_should_get_projects_with_pagination(self, repository_mock, b64encode_mock, mongo_mock):
        app.entrypoint(
            {
                'path': '/projects',
                'queryStringParameters': {'page': 'fake_page'}},
            {}
        )

        repository_mock.assert_called_once_with(self.client, 'fake_page', None, {}, {})

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.repository.get_projects')
    def test_should_get_projects_sorted(self, repository_mock, b64encode_mock, mongo_mock):
        app.entrypoint(
            {
                'path': '/projects',
                'queryStringParameters': {
                    'page': 'fake_page',
                    'sorted_by': 'total_commits'
                }
            },
            {}
        )

        repository_mock.assert_called_once_with(self.client, 'fake_page', 'total_commits', {}, {})

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.repository.get_projects')
    def test_should_get_projects_by_topics(self, repository_mock, b64encode_mock, mongo_mock):
        app.entrypoint(
            {
                'path': '/projects',
                'queryStringParameters': {
                    'page': 'fake_page',
                    'sorted_by': 'total_commits'
                },
                'multiValueQueryStringParameters': {
                    'topics': ["'feminism'", "'climate change'"]
                }
            },
            {}
        )

        repository_mock.assert_called_once_with(self.client, 'fake_page', 'total_commits', ['feminism', 'climate change'], None)

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.repository.get_topics')
    def test_should_get_topics(self, repository_mock, b64encode_mock, mongo_mock):
        app.entrypoint(
            {
                'path': '/topics',
            },
            {}
        )

        repository_mock.assert_called_once()

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.repository.get_projects')
    def test_should_get_projects_by_languages(self, repository_mock, b64encode_mock, mongo_mock):
        app.entrypoint(
            {
                'path': '/projects',
                'queryStringParameters': {
                    'page': 'fake_page',
                    'sorted_by': 'total_commits'
                },
                'multiValueQueryStringParameters': {
                    'languages': ["'Python'", "'Javascript'"]
                }
            },
            {}
        )

        repository_mock.assert_called_once_with(self.client, 'fake_page', 'total_commits', None, ['Python', 'Javascript'])

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.repository.get_languages')
    def test_should_get_languages(self, repository_mock, b64encode_mock, mongo_mock):
        app.entrypoint(
            {
                'path': '/languages',
            },
            {}
        )

        repository_mock.assert_called_once()

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.repository.autocomplete')
    def test_should_get_autocomplete_descriptions(self, repository_mock, b64encode_mock, mongo_mock):
        app.entrypoint(
            {
                'path': '/autocomplete',
                'queryStringParameters': {
                    'query': 'some_text'
                }
            },
            {}
        )

        repository_mock.assert_called_once_with(self.client, 'some_text')

    def test_should_convert_decimal_to_integer(self, mongo_mock):
        converted = app.decimal_default(decimal.Decimal(3))

        self.assertIsInstance(converted, int)
