resource "aws_api_gateway_rest_api" "backend" {
  name = "${var.environment}_api"
}

resource "aws_api_gateway_resource" "projects_resource" {
  parent_id   = aws_api_gateway_rest_api.backend.root_resource_id
  path_part   = "projects"
  rest_api_id = aws_api_gateway_rest_api.backend.id
}
