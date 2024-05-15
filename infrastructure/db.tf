resource "aws_secretsmanager_secret" "mongodb_uri" {
  name = "mongodb-uri"
}
