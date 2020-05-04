# Backend
resource "aws_api_gateway_rest_api" "backend" {
  name = "${var.environment}_api"
}

resource "aws_api_gateway_resource" "projects_resource" {
  parent_id   = aws_api_gateway_rest_api.backend.root_resource_id
  path_part   = "projects"
  rest_api_id = aws_api_gateway_rest_api.backend.id
}

# Scrape Projects Lambda
resource "aws_cloudwatch_event_rule" "trigger_scrapper_lamda" {
  name                = "trigger-scrapper-lambda-daily"
  description         = "Triggers the lambda that gathers info about projects from Github"
  schedule_expression = "rate(1 day)"
}

resource "aws_cloudwatch_event_target" "trigger_scraper_target" {
  arn  = module.scrapper-lambda.lambda_function.arn
  rule = aws_cloudwatch_event_rule.trigger_scrapper_lamda.name
}

resource "aws_iam_role" "scrapper_lambda_trigger_role" {
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cloudwatch.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

data "aws_iam_policy_document" "scrapper_lambda_trigger_policy_document" {
  statement {
    effect = "Allow"
    actions = [
      "lambda:InvokeLambda"
    ]
    resources = [
      module.scrapper-lambda.lambda_function.arn
    ]
  }
}

resource "aws_iam_policy" "scrapper_lambda_trigger_policy" {
  policy = data.aws_iam_policy_document.scrapper_lambda_trigger_policy_document.json
}

resource "aws_iam_role_policy_attachment" "scrapper_lambda_trigger_attachment" {
  policy_arn = aws_iam_policy.scrapper_lambda_trigger_policy.arn
  role       = aws_iam_role.scrapper_lambda_trigger_role.name
}

module "scrapper-lambda" {
  source = "nozaq/lambda-auto-package/aws"

  source_dir  = "${var.scrapper_lambda_path}/project_scrapper"
  output_path = "${var.scrapper_lambda_path}/source.zip"

  build_triggers = {
    lambda = base64sha256(file("${var.scrapper_lambda_path}/project_scrapper/handler.py"))
  }
  build_command = "python -m unittest ${var.scrapper_lambda_path}/tests/test_handler.py"

  iam_role_name_prefix = "scrapper-lambda-role-"

  function_name = "project-scrapper"
  handler       = "handler.lambda_handler"
  runtime       = "python3.7"
}
