resource "aws_iam_role" "mongo_db_rw" {
  name               = "mongo-db-rw"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}
