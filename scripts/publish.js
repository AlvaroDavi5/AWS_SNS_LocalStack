const dotenv = require('dotenv');
const { publishMessage } = require('../src/sns.js');

const topicFullArn = process.env.TOPIC_FULL_ARN || 'arn:aws:sns:us-east-1:000000000000:';
const topicName = process.env.TOPIC_NAME || 'DEFAULT_TOPIC.fifo';
const protocol = process.env.TOPIC_PROTOCOL || 'sqs';

const data = {
	subject: 'Hii',
	message: 'Hello World!'
};

publishMessage(
	protocol,
	`${topicFullArn}${topicName}`,
	topicName,
	data,
);
