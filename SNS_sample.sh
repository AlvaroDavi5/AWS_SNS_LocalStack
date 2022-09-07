#!/bin/bash


# create SNS topic
awslocal --endpoint-url=http://localhost:4566 sns create-topic --name=notification_events --region=us-east-1 --output=table | cat

# create SQS queue
awslocal --endpoint-url=http://localhost:4566 sqs create-queue --queue-name=test_queue --region=us-east-1 --output=table | cat

# list SNS topic
awslocal sns list-topics --output=table | cat

# list SQS queue
awslocal sqs list-queues --output=table | cat

# subscribe SNS topic on SQS queue
awslocal --endpoint-url=http://localhost:4566 sns subscribe --topic-arn=arn:aws:sns:us-east-1:000000000000:notification_events --protocol=sqs --notification-endpoint=http://localstack:4566/000000000000/test_queue --output=table | cat

# publish message on SNS topic
awslocal sns publish --endpoint-url=http://localhost:4566 --topic-arn=arn:aws:sns:us-east-1:000000000000:notification_events --message="Hello World" --region=us-east-1 --output=table | cat

# receive message from SQS queue
awslocal --endpoint-url=http://localhost:4566 sqs receive-message --queue-url=http://localhost:4566/000000000000/test_queue --region=us-east-1 --output=json | cat

# delete message from SQS queue
awslocal sqs delete-message --endpoint-url=http://localhost:4566 --queue-url=http://localhost:4566/000000000000/test_queue --region=us-east-1  --receipt-handle=XXXXXXXXXX --output=table | cat

# delete SNS topic
awslocal sns delete-topic --topic-arn=arn:aws:sns:us-east-1:000000000000:notification_events --output=table | cat

# delete SQS queue
awslocal sqs delete-queue --queue-url=http://localhost:4566/000000000000/test_queue --output=table | cat

