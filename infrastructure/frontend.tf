data "aws_route53_zone" "open_social_hosted_zone" {
  zone_id = var.open_social_hosted_zone
}

data "aws_acm_certificate" "open_social_certificate" {
  provider = aws.us-east-1
  domain   = "*.${trimsuffix(data.aws_route53_zone.open_social_hosted_zone.name, ".")}"
}

resource "aws_route53_record" "vercel_a_record" {
  name    = "@.open-social.net"
  type    = "A"
  zone_id = var.open_social_hosted_zone
  ttl     = 600
  records = ["76.76.21.21"]
}

resource "aws_route53_record" "open_social_url" {
  name    = "www.open-social.net"
  type    = "CNAME"
  zone_id = var.open_social_hosted_zone
  ttl     = 600
  records = ["cname.vercel-dns.com"]
}
