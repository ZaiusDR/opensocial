terraform {
  required_version = ">= 0.12.2"

  backend "s3" {
    region         = "eu-west-1"
    bucket         = "opensocial-top-open-social-state"
    key            = "terraform.tfstate"
    dynamodb_table = "opensocial-top-open-social-state-lock"
    profile        = ""
    role_arn       = ""
    encrypt        = "true"
  }
}
