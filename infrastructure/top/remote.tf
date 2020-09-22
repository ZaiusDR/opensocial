data "terraform_remote_state" "base_remote_state" {
  backend = "s3"

  config = {
    bucket = "opensocial-base-open-social-state"
    key    = "terraform.tfstate"
    region = "eu-west-1"
  }
}
