const dotenv = require('dotenv');
const { createTopic } = require('../src/sns.js');

const topicName = process.env.TOPIC_NAME || 'DEFAULT_TOPIC.fifo';

createTopic(topicName);
