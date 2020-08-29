import boto3


def save(projects):
    db_client = boto3.client('dynamodb')
    for project in projects:
        db_client.put_item(
            TableName='open-social-projects',
            Item={
                'full_name': {
                        'S': project.full_name
                },
                'project_name': {
                    'S': project.project_name
                }
            }
        )

    return projects
