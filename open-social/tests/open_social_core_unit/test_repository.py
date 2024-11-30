import unittest
from unittest.mock import patch

import mongomock
import pymongo

from open_social_core.repository import repository

from tests import fixtures


@patch('repository.creds_manager.get_connection_string', return_value='mongodb://localhost:27017')
@patch('repository.creds_manager.get_sts_credentials', return_value=fixtures.fake_credentials)
class TestRepository(unittest.TestCase):

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_store_projects(self, db_string, db_creds):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')

        repository.save_projects(fixtures.github_projects)

        project1 = db.projects.find_one({'full_name': 'user1/project_1'})
        self.assertEqual(project1['full_name'], fixtures.github_projects[0].full_name)
        self.assertEqual(project1['description'], fixtures.github_projects[0].description)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_update_projects_when_already_exist(self, db_string, db_creds):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        repository.save_projects(fixtures.github_projects)

        repository.save_projects(fixtures.updated_github_projects)

        project1 = db.projects.find_one({'full_name': 'user1/project_1'})
        self.assertEqual(project1['full_name'], fixtures.github_projects[0].full_name)
        self.assertEqual(project1['description'], fixtures.updated_github_projects[0].description)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_get_projects_without_pagination(self, db_string, db_creds):
        repository.save_projects(fixtures.github_projects)

        page_1 = repository.get_projects(None, None, None, None)

        self.assertEqual(len(page_1['projects']), 2)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_get_projects_with_pagination(self, db_string, db_creds):
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page_1 = repository.get_projects(0, None, None, None)
        page_2 = repository.get_projects(1, None, None, None)

        self.assertEqual(len(page_1['projects']), 12)
        self.assertEqual(len(page_2['projects']), 2)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_get_projects_sorted_by_total_commits_desc(self, db_string, db_creds):
        sorted_by = 'total_commits'
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(page=0, sorted_by=sorted_by, topics=None, languages=None)
        page2 = repository.get_projects(page=1, sorted_by=sorted_by, topics=None, languages=None)

        self.assertEqual(page1['projects'][0]['total_commits'], 14)
        self.assertEqual(page1['projects'][1]['total_commits'], 13)
        self.assertEqual(len(page1['projects']), 12)
        self.assertEqual(len(page2['projects']), 2)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_get_projects_sorted_by_contributors_desc(self, mock_db_string, mock_db_sts):
        sorted_by = 'contributors'
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(page=0, sorted_by=sorted_by, topics=None, languages=None)
        repository.get_projects(page=1, sorted_by=sorted_by, topics=None, languages=None)

        self.assertEqual(page1['projects'][0]['contributors'], 14)
        self.assertEqual(page1['projects'][1]['contributors'], 13)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_return_projects_sorted_by_rate_desc(self, db_string, db_creds):
        sorted_by = 'rate'
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(page=0, sorted_by=sorted_by, topics=None, languages=None)
        repository.get_projects(page=1, sorted_by=sorted_by, topics=None, languages=None)

        self.assertEqual(page1['projects'][0]['rate'], '0.9')
        self.assertEqual(page1['projects'][1]['rate'], '0.8')

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_return_projects_filtered_by_topics(self, db_string, db_creds):
        topics = ['topic_1', 'topic_2']
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(page=0, sorted_by=None, topics=topics, languages=None)
        repository.get_projects(page=1, sorted_by=None, topics=topics, languages=None)

        self.assertEqual(page1['projects'][0]['topic'], 'topic_1')
        self.assertEqual(page1['projects'][1]['topic'], 'topic_2')
        self.assertEqual(len(page1['projects']), 2)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_return_projects_filtered_by_topics_and_sorted_by_commits(self, db_string, db_creds):
        topics = ['topic_1', 'topic_4']
        sorted_by = 'total_commits'
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(page=0, sorted_by=sorted_by, topics=topics, languages=None)
        repository.get_projects(page=1, sorted_by=sorted_by, topics=topics, languages=None)

        self.assertEqual(page1['projects'][0]['topic'], 'topic_4')
        self.assertEqual(page1['projects'][1]['topic'], 'topic_1')
        self.assertEqual(page1['projects'][0]['total_commits'], 4)
        self.assertEqual(page1['projects'][1]['total_commits'], 1)
        self.assertEqual(len(page1['projects']), 2)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_return_projects_filtered_by_languages(self, db_string, db_creds):
        languages = ['fake_language_1', 'fake_language_2']
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(page=0, sorted_by=None, topics=None, languages=languages)
        repository.get_projects(page=1, sorted_by=None, topics=None, languages=languages)

        self.assertEqual(page1['projects'][0]['language'], 'fake_language_1')
        self.assertEqual(page1['projects'][1]['language'], 'fake_language_2')
        self.assertEqual(len(page1['projects']), 2)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_return_projects_using_all_filters(self, db_string, db_creds):
        # fake_language_3 and topic_4 shouldn't return any value, as both won't
        # be present on any project
        languages = ['fake_language_1', 'fake_language_2', 'fake_language_3']
        topics = ['topic_1', 'topic_2', 'topic_4']
        repository.save_projects(fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(page=0, sorted_by='total_commits', topics=topics, languages=languages)
        repository.get_projects(page=1, sorted_by='total_commits', topics=topics, languages=languages)

        self.assertEqual(page1['projects'][0]['language'], 'fake_language_2')
        self.assertEqual(page1['projects'][0]['topic'], 'topic_2')
        self.assertEqual(page1['projects'][1]['language'], 'fake_language_1')
        self.assertEqual(page1['projects'][1]['topic'], 'topic_1')
        self.assertEqual(len(page1['projects']), 2)

    # TODO: Enable when $text is added to pymongo
    # https://github.com/mongomock/mongomock/issues/839
    #
    # @mongomock.patch(servers=(('localhost', 27017),))
    # def test_should_search_projects_by_text(self, db_string, db_creds):
    #     text = 'description'
    #     repository.save_projects(fixtures.generate_github_projects_pagination())
    #
    #     page1 = repository.search_projects(text)
    #
    #     self.assertEqual(page1['projects'], 'topic_1')
    #     self.assertEqual(len(page1['projects']), 12)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_save_a_new_topic(self, db_string, db_creds):
        expected_topic = 'fake_new_topic'
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        db.topics.insert_one(fixtures.topics)

        repository.save_topic(expected_topic)

        saved_topics = db.topics.find_one({'name': 'topics'})
        self.assertEqual(saved_topics['topics'], ['fake_topic_1', expected_topic])

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_not_save_an_existing_topic(self, db_string, db_creds):
        existing_topic = 'fake_topic_1'
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        db.topics.insert_one(fixtures.topics)

        repository.save_topic(existing_topic)

        saved_topics = db.topics.find_one({'name': 'topics'})
        self.assertEqual(saved_topics['topics'], fixtures.topics['topics'])

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_return_topics(self, db_string, db_creds):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        db.topics.insert_one(fixtures.topics)

        topics = repository.get_topics()

        self.assertEqual(topics, fixtures.topics['topics'])

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_save_new_languages(self, db_string, db_creds):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        db.languages.insert_one(fixtures.languages)

        repository.save_languages(fixtures.github_projects)

        saved_languages = db.languages.find_one({'name': 'languages'})
        self.assertIn('fake_language_1', saved_languages['languages'])
        self.assertIn(fixtures.github_projects[0].language, saved_languages['languages'])
        self.assertIn(fixtures.github_projects[1].language, saved_languages['languages'])

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_not_save_an_existing_language(self, db_string, db_creds):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        db.languages.insert_one(fixtures.languages)

        # Saving twice
        repository.save_languages(fixtures.github_projects)
        repository.save_languages(fixtures.github_projects)

        saved_languages = db.languages.find_one({'name': 'languages'})
        self.assertEqual(len(saved_languages['languages']), 3)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_not_save_null_language(self, db_string, db_creds):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        db.languages.insert_one(fixtures.languages)

        repository.save_languages(fixtures.github_project_null_language)

        saved_languages = db.languages.find_one({'name': 'languages'})
        self.assertEqual(len(saved_languages['languages']), 1)

    @mongomock.patch(servers=(('localhost', 27017),))
    def test_should_return_languages(self, db_string, db_creds):
        client = pymongo.MongoClient('localhost', 27017)
        db = client.get_database('open-social')
        db.languages.insert_one(fixtures.languages)

        languages = repository.get_languages()

        self.assertEqual(languages, fixtures.languages['languages'])
