module "terraform_state_backend" {
  source     = "git::https://github.com/cloudposse/terraform-aws-tfstate-backend.git?ref=tags/0.33.1"
  namespace  = "Open Social"
  stage      = "base"
  name       = "open-social"
  attributes = ["state"]

  terraform_state_file = "terraform.tfstate"

  terraform_backend_config_file_path = "."
  terraform_backend_config_file_name = "backend.tf"
}
