const { SNS, listParams, createParams, subscribeParams, publishParams } = require('./util.js');

module.exports = {
	listTopics: async () => {
		SNS.listTopics(listParams, function (err, data) {
			if (err) {
				console.error("List Error:", err);
			}
			else {
				const topics = data?.Topics || [];
				console.log("Topics:");
				console.table(topics);
			}
		});
	},

	createTopic: async (topicName) => {
		SNS.createTopic(createParams(topicName), function (err, data) {
			if (err) {
				console.error("Creation Error:", err);
			}
			else {
				const topicArn = data?.TopicArn;
				console.log("Created Successfully:");
				console.table({ topicArn });
			}
		});
	},

	deleteTopic: async (topicArn) => {
		SNS.deleteTopic({ TopicArn: topicArn }, function (err, data) {
			if (err) {
				console.error("Error to Delete:", err);
			}
			else {
				console.log("Deleted Successfully:");
				console.table({ topicArn });
			}
		});
	},

	subscribeTopic: async (protocol, topicArn, to) => {
		SNS.subscribe(subscribeParams(protocol, topicArn, to), function (err, data) {
			if (err) {
				console.error("Subscribe Error:", err);
			}
			else {
				console.log("Subscribed Successfully:");
				console.table({ subscriptionArn: data?.SubscriptionArn });
			}
		});
	},

	unsubscribeTopic: async (subscriptionArn) => {
		SNS.unsubscribe({ SubscriptionArn: subscriptionArn }, function (err, data) {
			if (err) {
				console.error("Unsubscribe Error:", err);
			}
			else {
				console.log("Unsubscribed Successfully:");
				console.table({ subscriptionArn });
			}
		});
	},

	publishMessage: async (protocol, topicArn, topicName, msgData) => {
		SNS.publish(publishParams(protocol, topicArn, topicName, msgData), function (err, data) {
			if (err) {
				console.error("Send Error:", err);
			}
			else {
				console.log("Send Successfully:");
				console.table({ messageId: data?.MessageId });
			}
		});
	},
};
