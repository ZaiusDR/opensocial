import unittest

from scrapper_lambda.project_scrapper import handler


class TestLambda(unittest.TestCase):
    def test_should_return_hello_world(self):
        self.assertEqual(handler.lambda_handler({}, {}), 'Hello World!')
