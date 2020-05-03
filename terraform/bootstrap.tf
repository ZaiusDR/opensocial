module "terraform_state_backend" {
  source        = "git::https://github.com/cloudposse/terraform-aws-tfstate-backend.git?ref=tags/0.16.0"
  namespace     = "Open Social"
  stage         = "dev"
  name          = "open-social"
  attributes    = ["state"]
  region        = "eu-west-1"
}
