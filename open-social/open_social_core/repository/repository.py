import json
import os

import boto3
import pymongo


def save_projects(projects):
    projects_collection = _get_collection('projects')

    projects_as_dicts = _convert_projects_to_dict(projects)

    saved_projects = []
    for project in projects_as_dicts:
        project = projects_collection.update_one(
            filter={'_id': project['full_name']},
            update={'$set': project},
            upsert=True
        )
        saved_projects.append(project)

    return saved_projects


def get_projects(page, sorted_by, topics, languages):
    projects_collection = _get_collection('projects')

    results_limit = 12
    query_filter = {}

    if sorted_by:
        sorted_by = [(sorted_by, pymongo.DESCENDING)]

    if topics and languages:
        query_filter.update({
            '$and': [
                {'topic': {'$in': topics}},
                {'language': {'$in': languages}}
            ]
        })
    elif topics:
        query_filter.update({'topic': {'$in': topics}})
    elif languages:
        query_filter.update({'language': {'$in': languages}})

    projects = list(projects_collection.find(
        filter=query_filter,
        skip=int(page if page else 0) * results_limit,
        limit=results_limit,
        sort=sorted_by
    ))

    response = {
        'projects': projects
    }

    return response


def search_projects(search_text):
    projects_collection = _get_collection('projects')

    projects = projects_collection.aggregate([
        {
            '$search': {
                'index': 'search',
                'text': {
                    'path': 'description',
                    'query': search_text
                }
            }
        },
        {
            '$limit': 5
        },
        {
            '$project': {
                'description': 1
            }
        }
    ])

    return list(projects)


def save_topic(topic):
    topics_collection = _get_collection('topics')

    topics_collection.update_one(
        {'name': 'topics'},
        {'$addToSet': {'topics': topic}}
    )


def get_topics():
    topics_collection = _get_collection('topics')

    topics = topics_collection.find_one({'name': 'topics'})

    return topics['topics']


def save_languages(projects):
    languages_collection = _get_collection('languages')

    projects_as_dict = _convert_projects_to_dict(projects)
    languages = {project['language'] for project in projects_as_dict if project['language']}
    for language in languages:
        languages_collection.update_one(
            {'name': 'languages'},
            {'$addToSet': {'languages': language}}
        )


def get_languages():
    languages_collection = _get_collection('languages')

    languages = languages_collection.find_one({'_id': 'languages'})

    return languages['languages']


def _convert_projects_to_dict(projects):
    return [project._asdict() for project in projects]


def _get_collection(collection_name):
    sts_client = boto3.client('sts')

    response = sts_client.assume_role(
        RoleArn='arn:aws:iam::326499071401:role/mongo-db-rw',
        RoleSessionName='AssumeRole'
    )
    os.environ['AWS_ACCESS_KEY_ID'] = response['Credentials']['AccessKeyId']
    os.environ['AWS_SECRET_ACCESS_KEY'] = response['Credentials']['SecretAccessKey']
    os.environ['AWS_SESSION_TOKEN'] = response['Credentials']['SessionToken']

    secrets_manager_client = boto3.client('secretsmanager')
    secret_data = secrets_manager_client.get_secret_value(SecretId='mongodb-uri')
    uri = json.loads(secret_data['SecretString'])['mongo_db_uri']

    mongo_client = pymongo.MongoClient(uri)
    db = mongo_client.get_database('open-social')
    return db.get_collection(collection_name)
