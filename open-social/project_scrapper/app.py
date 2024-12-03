import json

import pymongo

from infrastructure import github_gateway
from repository import creds_manager
from repository import repository

mongo_client = None

def lambda_handler(event, context):
    global mongo_client
    if not mongo_client:
        mongo_client = pymongo.MongoClient(creds_manager.get_connection_string())
    github_projects = github_gateway.get_project_list(event)
    repository.save_languages(mongo_client, github_projects)
    projects = repository.save_projects(mongo_client, github_projects)

    repository.save_topic(mongo_client, event['topic'])

    return {
        "statusCode": 200,
        "body": json.dumps({
            "projects_updated": projects,
        }),
    }
