terraform {
  backend "s3" {
    region         = "eu-west-1"
    bucket         = "opensocial-dev-open-social-state"
    key            = "terraform.tfstate"
    dynamodb_table = "opensocial-dev-open-social-state-lock"
    encrypt        = true
  }
}
