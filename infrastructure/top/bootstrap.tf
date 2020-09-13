module "terraform_state_backend" {
  source     = "git::https://github.com/cloudposse/terraform-aws-tfstate-backend.git"
  namespace  = "Open Social"
  stage      = "top"
  name       = "open-social"
  attributes = ["state"]
  region     = "eu-west-1"

  terraform_state_file = "terraform.tfstate"

  terraform_backend_config_file_path = "."
  terraform_backend_config_file_name = "backend.tf"
}
