const dotenv = require('dotenv');
const uuid = require('uuid');

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');


const topicUrl = process.env.TOPIC_URL || 'http://localhost:4566/';
const awsRegion = process.env.AWS_REGION || 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'mock';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID || 'mock';
const messageDeduplicationId = uuid.v4();
const messageGroupId = process.env.AWS_MESSAGE_GROUP_ID || 'Group1';

// Set the region
AWS.config.update({ region: awsRegion });

const config = {
	endpoint: new AWS.Endpoint(topicUrl), // https://sns.us-east-1.amazonaws.com
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
	region: awsRegion,
};

// Create an SNS service object
const SNS = new AWS.SNS(config);

const listParams = {};

const createParams = (topicName) => {
	return {
		Name: topicName,
		Attributes: {
			ContentBasedDeduplication: 'false',
			FifoTopic: String(topicName?.includes('.fifo')),
		}
	}
};

const subscribeParams = (protocol, topicArn, to) => {
	const endpoint = to || topicUrl;

	return {
		Protocol: String(protocol),
		TopicArn: String(topicArn),
		Endpoint: String(endpoint),
	}
};

const publishParams = (protocol, topicArn, topicName, { message, subject, phoneNumber, url, endpoint }) => {
	const fifoParams = {};

	if (topicName?.includes('.fifo')) {
		fifoParams.MessageDeduplicationId = messageDeduplicationId;
		fifoParams.MessageGroupId = messageGroupId;
	}

	let messageBody = String(message);
	if (typeof (message) === 'object') {
		messageBody = JSON.stringify(message);
	}

	const publishData = {
		TopicArn: topicArn,
		Message: messageBody,
		...fifoParams,
	};

	switch (String(protocol).toLowerCase()) {
		case 'email':
			publishData.Subject = subject;
			break;
		case 'sms':
			publishData.PhoneNumber = phoneNumber;
			break;
		case 'http':
			publishData.Url = url;
			break;
		case 'https':
			publishData.Url = url;
			break;
		case 'sqs':
			publishData.Endpoint = endpoint;
			break;
		case 'lamda':
			publishData.Endpoint = endpoint;
			break;
		case 'application':
			publishData.Endpoint = endpoint;
			break;
		default:
			publishData.TargetArn = topicArn;
			break;
	}

	return publishData;
};


module.exports = {
	SNS,
	listParams,
	createParams,
	subscribeParams,
	publishParams,
};
