variable "frontend_bucket_name" {
  type    = string
  default = "open-social-front"
}

variable "open_social_hosted_zone" {
  type    = string
  default = "Z056117665GXDL3UXFF7"
}

variable "cloud_front_origin_id" {
  type    = string
  default = "open-social-target-id"
}
