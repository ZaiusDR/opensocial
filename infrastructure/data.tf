data "aws_route53_zone" "open_social_hosted_zone" {
  zone_id = local.open_social_hosted_zone
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = local.lambda_roles_arns
      type        = "AWS"
    }
  }
}
