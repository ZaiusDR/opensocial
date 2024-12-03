import pymongo


def save_projects(mongo_client, projects):
    projects_collection = _get_collection(mongo_client, 'projects')

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


def get_projects(mongo_client, page, sorted_by, topics, languages):
    projects_collection = _get_collection(mongo_client, 'projects')
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


def save_topic(mongo_client, topic):
    topics_collection = _get_collection(mongo_client, 'topics')

    topics_collection.update_one(
        {'name': 'topics'},
        {'$addToSet': {'topics': topic}}
    )


def get_topics(mongo_client):
    topics_collection = _get_collection(mongo_client,'topics')

    topics = topics_collection.find_one({'name': 'topics'})

    return topics['topics']


def save_languages(mongo_client, projects):
    languages_collection = _get_collection(mongo_client,'languages')

    projects_as_dict = _convert_projects_to_dict(projects)
    languages = {project['language'] for project in projects_as_dict if project['language']}
    for language in languages:
        languages_collection.update_one(
            {'name': 'languages'},
            {'$addToSet': {'languages': language}}
        )


def get_languages(mongo_client):
    languages_collection = _get_collection(mongo_client,'languages')

    languages = languages_collection.find_one({'_id': 'languages'})

    return languages['languages']


def _convert_projects_to_dict(projects):
    return [project._asdict() for project in projects]


def _get_collection(mongo_client, collection_name):
    db = mongo_client.get_database('open-social')
    collection = db.get_collection(collection_name)

    return collection
