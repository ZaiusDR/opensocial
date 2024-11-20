resource "aws_secretsmanager_secret" "mongodb_uri" {
  name = "mongodb-uri"
}

resource "aws_secretsmanager_secret" "datadog_api_key" {
  name = "datadog-api-key"
}
