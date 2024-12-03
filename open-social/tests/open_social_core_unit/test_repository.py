import unittest

import mongomock

from open_social_core.repository import repository

from tests import fixtures


@mongomock.patch(servers=(('localhost', 27017),))
class TestRepository(unittest.TestCase):

    def setUp(self):
        self.client = mongomock.MongoClient('localhost', 27017)

    def test_should_store_projects(self):
        db = self.client.get_database('open-social')

        repository.save_projects(self.client, fixtures.github_projects)

        project1 = db.projects.find_one({'full_name': 'user1/project_1'})
        self.assertEqual(project1['full_name'], fixtures.github_projects[0].full_name)
        self.assertEqual(project1['description'], fixtures.github_projects[0].description)

    def test_should_update_projects_when_already_exist(self):
        db = self.client.get_database('open-social')
        repository.save_projects(self.client, fixtures.github_projects)

        repository.save_projects(self.client, fixtures.updated_github_projects)

        project1 = db.projects.find_one({'full_name': 'user1/project_1'})
        self.assertEqual(project1['full_name'], fixtures.github_projects[0].full_name)
        self.assertEqual(project1['description'], fixtures.updated_github_projects[0].description)

    def test_should_get_projects_without_pagination(self):
        repository.save_projects(self.client, fixtures.github_projects)

        page_1 = repository.get_projects(self.client, None, None, None, None)

        self.assertEqual(len(page_1['projects']), 2)

    def test_should_get_projects_with_pagination(self):
        repository.save_projects(self.client, fixtures.generate_github_projects_pagination())

        page_1 = repository.get_projects(self.client, 0, None, None, None)
        page_2 = repository.get_projects(self.client, 1, None, None, None)

        self.assertEqual(len(page_1['projects']), 12)
        self.assertEqual(len(page_2['projects']), 2)

    def test_should_get_projects_sorted_by_total_commits_desc(self):
        sorted_by = 'total_commits'
        repository.save_projects(self.client, fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(self.client, page=0, sorted_by=sorted_by, topics=None, languages=None)
        page2 = repository.get_projects(self.client, page=1, sorted_by=sorted_by, topics=None, languages=None)

        self.assertEqual(page1['projects'][0]['total_commits'], 14)
        self.assertEqual(page1['projects'][1]['total_commits'], 13)
        self.assertEqual(len(page1['projects']), 12)
        self.assertEqual(len(page2['projects']), 2)

    def test_should_get_projects_sorted_by_contributors_desc(self):
        sorted_by = 'contributors'
        repository.save_projects(self.client, fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(self.client, page=0, sorted_by=sorted_by, topics=None, languages=None)
        repository.get_projects(self.client, page=1, sorted_by=sorted_by, topics=None, languages=None)

        self.assertEqual(page1['projects'][0]['contributors'], 14)
        self.assertEqual(page1['projects'][1]['contributors'], 13)

    def test_should_return_projects_sorted_by_rate_desc(self):
        sorted_by = 'rate'
        repository.save_projects(self.client, fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(self.client, page=0, sorted_by=sorted_by, topics=None, languages=None)
        repository.get_projects(self.client, page=1, sorted_by=sorted_by, topics=None, languages=None)

        self.assertEqual(page1['projects'][0]['rate'], '0.9')
        self.assertEqual(page1['projects'][1]['rate'], '0.8')

    def test_should_return_projects_filtered_by_topics(self):
        topics = ['topic_1', 'topic_2']
        repository.save_projects(self.client, fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(self.client, page=0, sorted_by=None, topics=topics, languages=None)
        repository.get_projects(self.client, page=1, sorted_by=None, topics=topics, languages=None)

        self.assertEqual(page1['projects'][0]['topic'], 'topic_1')
        self.assertEqual(page1['projects'][1]['topic'], 'topic_2')
        self.assertEqual(len(page1['projects']), 2)

    def test_should_return_projects_filtered_by_topics_and_sorted_by_commits(self):
        topics = ['topic_1', 'topic_4']
        sorted_by = 'total_commits'
        repository.save_projects(self.client, fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(self.client, page=0, sorted_by=sorted_by, topics=topics, languages=None)
        repository.get_projects(self.client, page=1, sorted_by=sorted_by, topics=topics, languages=None)

        self.assertEqual(page1['projects'][0]['topic'], 'topic_4')
        self.assertEqual(page1['projects'][1]['topic'], 'topic_1')
        self.assertEqual(page1['projects'][0]['total_commits'], 4)
        self.assertEqual(page1['projects'][1]['total_commits'], 1)
        self.assertEqual(len(page1['projects']), 2)

    def test_should_return_projects_filtered_by_languages(self):
        languages = ['fake_language_1', 'fake_language_2']
        repository.save_projects(self.client, fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(self.client, page=0, sorted_by=None, topics=None, languages=languages)
        repository.get_projects(self.client, page=1, sorted_by=None, topics=None, languages=languages)

        self.assertEqual(page1['projects'][0]['language'], 'fake_language_1')
        self.assertEqual(page1['projects'][1]['language'], 'fake_language_2')
        self.assertEqual(len(page1['projects']), 2)

    def test_should_return_projects_using_all_filters(self):
        # fake_language_3 and topic_4 shouldn't return any value, as both won't
        # be present on any project
        languages = ['fake_language_1', 'fake_language_2', 'fake_language_3']
        topics = ['topic_1', 'topic_2', 'topic_4']
        repository.save_projects(self.client, fixtures.generate_github_projects_pagination())

        page1 = repository.get_projects(self.client, page=0, sorted_by='total_commits', topics=topics, languages=languages)
        repository.get_projects(self.client, page=1, sorted_by='total_commits', topics=topics, languages=languages)

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

    def test_should_save_a_new_topic(self):
        expected_topic = 'fake_new_topic'
        db = self.client.get_database('open-social')
        db.topics.insert_one(fixtures.topics)

        repository.save_topic(self.client, expected_topic)

        saved_topics = db.topics.find_one({'name': 'topics'})
        self.assertEqual(saved_topics['topics'], ['fake_topic_1', expected_topic])

    def test_should_not_save_an_existing_topic(self):
        existing_topic = 'fake_topic_1'
        db = self.client.get_database('open-social')
        db.topics.insert_one(fixtures.topics)

        repository.save_topic(self.client, existing_topic)

        saved_topics = db.topics.find_one({'name': 'topics'})
        self.assertEqual(saved_topics['topics'], fixtures.topics['topics'])

    def test_should_return_topics(self):
        db = self.client.get_database('open-social')
        db.topics.insert_one(fixtures.topics)

        topics = repository.get_topics(self.client)

        self.assertEqual(topics, fixtures.topics['topics'])

    def test_should_save_new_languages(self):
        db = self.client.get_database('open-social')
        db.languages.insert_one(fixtures.languages)

        repository.save_languages(self.client, fixtures.github_projects)

        saved_languages = db.languages.find_one({'name': 'languages'})
        self.assertIn('fake_language_1', saved_languages['languages'])
        self.assertIn(fixtures.github_projects[0].language, saved_languages['languages'])
        self.assertIn(fixtures.github_projects[1].language, saved_languages['languages'])

    def test_should_not_save_an_existing_language(self):
        db = self.client.get_database('open-social')
        db.languages.insert_one(fixtures.languages)

        # Saving twice
        repository.save_languages(self.client, fixtures.github_projects)
        repository.save_languages(self.client, fixtures.github_projects)

        saved_languages = db.languages.find_one({'name': 'languages'})
        self.assertEqual(len(saved_languages['languages']), 3)

    def test_should_not_save_null_language(self):
        db = self.client.get_database('open-social')
        db.languages.insert_one(fixtures.languages)

        repository.save_languages(self.client, fixtures.github_project_null_language)

        saved_languages = db.languages.find_one({'name': 'languages'})
        self.assertEqual(len(saved_languages['languages']), 1)

    def test_should_return_languages(self):
        db = self.client.get_database('open-social')
        db.languages.insert_one(fixtures.languages)

        languages = repository.get_languages(self.client)

        self.assertEqual(languages, fixtures.languages['languages'])
