'use strict';
let BaseConnector = require('./BaseConnector');
let amqp = require('amqplib');

class AqmpConnector extends BaseConnector {
    constructor(options) {
        super();
        this.options = {amqpUrl: 'amqp://localhost', amqpQueue: 'test-post-cache'};
        Object.assign(this.options, options);
        this.client = null;
        this.ready = false;
    }

    async initialize() {
        let connection = await amqp.connect(this.options.amqpUrl);
        let channel = await connection.createChannel();
        this.ready = true;
        channel.assertQueue(this.options.amqpQueue, {durable: false, autoDelete: true});
        channel.consume(this.options.amqpQueue, async (event) => {
            await channel.ack(event);
            // console.log(event.content.toString());
            this.emit('event', JSON.parse(event.content.toString()));
        });

    }
}

module.exports = AqmpConnector;
