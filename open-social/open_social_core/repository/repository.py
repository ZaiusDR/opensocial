import json
import os
import time

import boto3
import pymongo


mongo_client = None

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
    global mongo_client
    projects_collection = _get_collection('projects', mongo_client)
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
    global mongo_client
    projects_collection = _get_collection('projects', mongo_client)

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
    global mongo_client
    topics_collection = _get_collection('topics', mongo_client)

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


def _get_collection(collection_name, client=None):
    get_secret_start = time.time()
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
    get_secret_end = time.time()
    print('Get Secret:', get_secret_end - get_secret_start)

    print(client)
    get_connection_start = time.time()
    if not client:
        client = pymongo.MongoClient(
            uri,
            maxPoolSize=10,
            minPoolSize=1
        )
    get_connection_end = time.time()
    print('Get Connection:', get_connection_end - get_connection_start)

    get_db_start = time.time()
    db = client.get_database('open-social')
    get_db_end = time.time()
    print('Get DB:', get_db_end - get_db_start)

    get_collection_start = time.time()
    collection = db.get_collection(collection_name)
    get_collection_end = time.time()
    print('Get Collection:', get_collection_end - get_collection_start)
    return collection
