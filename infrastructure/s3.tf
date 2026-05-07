provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "bossa_orders" {
  bucket = "bossaeats-order-exports-internal"
  # VULNERABILITY: Publicly accessible bucket
  acl    = "public-read"

  tags = {
    Environment = "Prod"
  }
}

resource "aws_s3_bucket_public_access_block" "bad_config" {
  bucket = aws_s3_bucket.bossa_orders.id

  # VULNERABILITY: Explicitly allowing public access
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
