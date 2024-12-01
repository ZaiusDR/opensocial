import pymongo

from requests.utils import quote

from repository import creds_manager


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
    sts_credentials = creds_manager.get_sts_credentials()
    connection_string = creds_manager.get_connection_string()

    # TODO: I'll fix this crap, I promise!
    connection_string = connection_string.replace(
        '__key_id__', quote(sts_credentials['AccessKeyId'], safe='')
    )
    connection_string = connection_string.replace(
        '__secret_key__', quote(sts_credentials['SecretAccessKey'], safe='')
    )
    connection_string = connection_string.replace(
        '__session_token__', quote(sts_credentials['SessionToken'], safe='')
    )

    mongo_client = pymongo.MongoClient(
        connection_string,
        maxPoolSize=10,
        minPoolSize=1
    )
    db = mongo_client.get_database('open-social')
    collection = db.get_collection(collection_name)

    return collection
