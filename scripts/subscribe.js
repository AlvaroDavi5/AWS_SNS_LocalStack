const dotenv = require('dotenv');
const { subscribeTopic } = require('../src/sns.js');

const topicFullArn = process.env.TOPIC_FULL_ARN || 'arn:aws:sns:us-east-1:000000000000:';
const topicName = process.env.TOPIC_NAME || 'DEFAULT_TOPIC.fifo';

subscribeTopic(
	'email',
	`${topicFullArn}${topicName}`,
	'alvaro.davisa@gmail.com',
);
