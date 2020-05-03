resource "aws_instance" "testing" {
  ami           = "ami-06ce3edf0cff21f07"
  instance_type = "t2.micro"
}
