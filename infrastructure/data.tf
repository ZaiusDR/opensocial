data "aws_route53_zone" "open_social_hosted_zone" {
  zone_id = local.open_social_hosted_zone
}

data "aws_acm_certificate" "open_social_certificate" {
  provider = aws.us-east-1
  domain   = "*.${trimsuffix(data.aws_route53_zone.open_social_hosted_zone.name, ".")}"
}
