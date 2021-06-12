terraform {
  required_version = ">= 1.0.0"

  backend "s3" {
    region         = "eu-west-1"
    bucket         = "opensocial-base-open-social-state"
    key            = "terraform.tfstate"
    dynamodb_table = "opensocial-base-open-social-state-lock"
    profile        = ""
    role_arn       = ""
    encrypt        = "true"
  }
}
