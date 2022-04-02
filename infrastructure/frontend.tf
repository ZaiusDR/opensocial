resource "aws_s3_bucket" "open-social-front" {
  bucket = var.frontend_bucket_name
}

resource "aws_s3_bucket_website_configuration" "open-social-front" {
  bucket = aws_s3_bucket.open-social-front.bucket

  index_document {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_acl" "open-social-front" {
  bucket = aws_s3_bucket.open-social-front.id
  acl    = "private"
}

resource "aws_s3_bucket_policy" "open-social-front" {
  bucket = aws_s3_bucket.open-social-front.bucket
  policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": {
        "CanonicalUser": "${aws_cloudfront_origin_access_identity.open_social_cloud_front_identity.s3_canonical_user_id}"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${var.frontend_bucket_name}/*"
    }
  ]
}
EOF
}

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
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    lambda_function_association {
      event_type = "viewer-response"
      lambda_arn = aws_lambda_function.lambda_edge_headers.qualified_arn
    }
  }
  origin {
    domain_name = aws_s3_bucket.open-social-front.bucket_domain_name
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
    acm_certificate_arn      = data.aws_acm_certificate.open_social_certificate.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }
}

resource "aws_lambda_function" "lambda_edge_headers" {
  function_name = "lambda-edge-headers"
  handler       = "index.lambda_handler"
  role          = aws_iam_role.lambda_edge_headers_role.arn
  runtime       = "python3.8"
  timeout       = 1
  filename      = "${abspath(path.cwd)}/lambda_files/index.zip"

  source_code_hash = filebase64sha256("${abspath(path.cwd)}/lambda_files/index.zip")

  provider = aws.us-east-1
}

resource "aws_iam_role" "lambda_edge_headers_role" {
  name = "open-social-lambda-edge-headers"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
      },
      "Effect": "Allow"
    }
  ]
}
EOF

  provider = aws.us-east-1
}

data "aws_iam_policy_document" "lambda_edge_headers_policy_document" {
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    resources = [
      "*",
    ]
  }
}

resource "aws_iam_role_policy" "lambda_edge_headers_policy" {
  policy = data.aws_iam_policy_document.lambda_edge_headers_policy_document.json
  role   = aws_iam_role.lambda_edge_headers_role.id

  provider = aws.us-east-1
}
