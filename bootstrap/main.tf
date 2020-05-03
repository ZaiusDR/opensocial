provider "aws" {
  profile = "opensocial"
}

resource "aws_s3_bucket" "open-social-remote-state" {
  bucket = "open-social-remote-state"
  versioning {
    enabled = true
  }
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_dynamodb_table" "tf-state-lock" {
  hash_key = "LockID"
  name = "open-social-tf-state-lock"
  read_capacity = 20
  write_capacity = 20

  attribute {
    name = "LockID"
    type = "S"
  }
}
