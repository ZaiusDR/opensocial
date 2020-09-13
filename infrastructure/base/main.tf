resource "aws_s3_bucket" "open-social-front" {
  bucket = var.frontend_bucket_name
  acl    = "public-read"

  website {
    index_document = "index.html"
  }

  policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${var.frontend_bucket_name}/*"
    }
  ]
}
EOF
}
