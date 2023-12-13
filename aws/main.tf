# main.tf

# Specify the AWS provider and the region
provider "aws" {
  region = "us-west-2"
}

# Create an IAM role and policy for the Lambda function
resource "aws_iam_role" "lambda_role" {
  name               = "lambda-role-api-42"
  assume_role_policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }
  EOF
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Create a zip file that contains the Python script and dependencies
data "archive_file" "python_lambda_package" {
  type        = "zip"
  source_file = "${path.module}/lambda_function.py"
  output_path = "lambda.zip"
}

# Create a Lambda function that uses the zip file and the IAM role
resource "aws_lambda_function" "test_lambda_function" {
  filename         = "lambda.zip"
  function_name    = "lambda-Api42"
  role             = aws_iam_role.lambda_role.arn
  handler          = "lambda_function.lambda_handler"
  source_code_hash = data.archive_file.python_lambda_package.output_base64sha256
  runtime          = "python3.11"
  timeout          = 10
}

# Create a Lambda function URL with no authorization
resource "aws_lambda_function_url" "function" {
  function_name      = aws_lambda_function.test_lambda_function.function_name
  authorization_type = "NONE"
}

# Output the function URL
output "function_url" {
  value = aws_lambda_function_url.function.function_url
}
