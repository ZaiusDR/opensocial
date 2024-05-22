import decimal
import unittest

from unittest import mock

from open_social_crud import app


class TestApp(unittest.TestCase):

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.project_service.get_projects')
    def test_should_get_projects_with_pagination(self, project_service_mock, b64encode_mock):
        app.list_projects({'queryStringParameters': {'page': 'fake_page'}}, {})

        project_service_mock.assert_called_once_with('fake_page', None)

    @mock.patch('open_social_crud.app._gzip_b64encode')
    @mock.patch('open_social_crud.app.project_service.get_projects')
    def test_should_get_projects_sorted_by_asc(self, project_service_mock, b64encode_mock):
        app.list_projects(
            {
                'queryStringParameters': {
                    'page': 'fake_page',
                    'sorted_by': 'total_commits'
                }
            },
            {}
        )

        project_service_mock.assert_called_once_with('fake_page', 'total_commits')

    def test_should_convert_decimal_to_integer(self):
        converted = app.decimal_default(decimal.Decimal(3))

        self.assertIsInstance(converted, int)
