terraform {
  backend "s3" {
    region         = "eu-west-1"
    bucket         = "opensocial-base-open-social-state"
    key            = "terraform.tfstate"
    dynamodb_table = "opensocial-base-open-social-state-lock"
    encrypt        = "true"
  }
}
