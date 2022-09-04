const dotenv = require('dotenv');
const { subscribeTopic } = require('../src/sns.js');

const topicFullArn = process.env.TOPIC_FULL_ARN || 'arn:aws:sns:us-east-1:000000000000:';
const topicName = process.env.TOPIC_NAME || 'DEFAULT_TOPIC.fifo';
const protocol = process.env.TOPIC_PROTOCOL || 'sqs';
const destiny = process.env.TOPIC_DESTINY || 'http://localhost:4566/000000000000/DEFAULT_QUEUE.fifo';

subscribeTopic(
	protocol,
	`${topicFullArn}${topicName}`,
	destiny,
);
