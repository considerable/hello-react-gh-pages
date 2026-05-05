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

# API Gateway v2 HTTP API - proxies Lambda, avoids content blocker issues
resource "aws_apigatewayv2_api" "api" {
  name          = "api42"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "OPTIONS"]
    allow_headers = ["*"]
    max_age       = 86400
  }
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.test_lambda_function.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "answer" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /answer"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.test_lambda_function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

# Output the function URL
output "function_url" {
  value = aws_lambda_function_url.function.function_url
}

# Output the API Gateway URL
output "api_gateway_url" {
  value = "${aws_apigatewayv2_stage.default.invoke_url}/answer"
}
