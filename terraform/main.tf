resource "aws_api_gateway_rest_api" "backend" {
  name = "${var.environment}_api"
}
