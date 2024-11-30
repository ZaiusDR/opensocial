resource "aws_secretsmanager_secret" "mongodb_uri" {
  name = "mongodb-uri"
}

resource "aws_secretsmanager_secret" "mongodb_sts_credentials" {
  name = "mongodb-sts-credentials"
}
