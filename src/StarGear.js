let EventEmitter;
try {
    EventEmitter = require('eventemitter3');
} catch (e) {
    EventEmitter = require('events').EventEmitter;
}
const DiscordRestConnector = require('./connector/DiscordRestConnector');
const EventProcessor = require('./EventProcessor');

class Stargear extends EventEmitter {
    constructor(options, inboundConnector) {
        super();
        this.options = {};
        Object.assign(this.options, options);
        if (!this.options.cache) {
            console.error('Missing cache');
        }
        this.cache = this.options.cache;
        if (!inboundConnector) {
            throw new Error('Missing inbound connector');
        }
        this.inbound = inboundConnector;
        this.eventProcessor = new EventProcessor(this.options, this);
        this.restConnector = new DiscordRestConnector();
    }

    async initialize() {
        if (this.cache && !this.cache.ready) {
            await this.cache.initialize();
        }
        if (!this.inbound.ready) {
            await this.inbound.initialize();
        }
        this.inbound.on('event', async (event) => {
            await this.eventProcessor.inbound(event);
        });
    }
}

module.exports = Stargear;
