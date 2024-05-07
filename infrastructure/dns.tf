resource "aws_route53_record" "vercel_a_record" {
  name    = "@.open-social.net"
  type    = "A"
  zone_id = local.open_social_hosted_zone
  ttl     = 600
  records = ["76.76.21.21"]
}

resource "aws_route53_record" "open_social_url" {
  name    = "www.open-social.net"
  type    = "CNAME"
  zone_id = local.open_social_hosted_zone
  ttl     = 600
  records = ["cname.vercel-dns.com"]
}
