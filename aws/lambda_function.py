import json

def lambda_handler(event, context):

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': '{"message": "42 is the Answer to the Ultimate Question of Life, the Universe, and Everything"}'
    }
