data "aws_route53_zone" "open_social_hosted_zone" {
  zone_id = var.open_social_hosted_zone
}

data "aws_acm_certificate" "open_social_certificate" {
  provider = aws.us-east-1
  domain   = "*.${trimsuffix(data.aws_route53_zone.open_social_hosted_zone.name, ".")}"
}

resource "aws_route53_record" "open_social_url" {
  name    = "www.open-social.net"
  type    = "CNAME"
  zone_id = var.open_social_hosted_zone
  ttl     = 600
  records = [aws_cloudfront_distribution.open_social_front_cloud_front.domain_name]
}

resource "aws_cloudfront_origin_access_identity" "open_social_cloud_front_identity" {
  comment = "open-social-origin-access-id"
}

resource "aws_cloudfront_distribution" "open_social_front_cloud_front" {
  enabled             = true
  aliases             = ["www.open-social.net"]
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = var.cloud_front_origin_id
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false
      cookies {
        forward = "all"
      }
    }
  }
  origin {
    domain_name = data.terraform_remote_state.base_remote_state.outputs.front_s3_bucket_domain_name
    origin_id   = var.cloud_front_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.open_social_cloud_front_identity.cloudfront_access_identity_path
    }
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.open_social_certificate.arn
    ssl_support_method  = "sni-only"
  }
}
