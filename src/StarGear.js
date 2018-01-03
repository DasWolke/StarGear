let EventEmitter;
try {
    EventEmitter = require('eventemitter3');
} catch (e) {
    EventEmitter = require('events').EventEmitter;
}
const SnowTransfer = require('snowtransfer');
const EventProcessor = require('./EventProcessor');
const utils = require('./utils');

/**
 * Base class of the framework
 * @extends EventEmitter
 * @property {RainCache} cache - cache class to be used for enhancing received events
 * @property {SnowTransfer} rest - rest client of the framework
 * @property {EventProcessor} eventProcessor - class responsible for processing incoming events
 * @property {utils} utils - object with util functions for ease of usability
 * @property inbound - connector used for receiving incoming events
 */
class StarGear extends EventEmitter {
    constructor(options, inboundConnector) {
        super();
        this.options = {};
        Object.assign(this.options, options);
        this.cache = this.options.cache;
        this.voice = this.options.voice;
        if (!inboundConnector) {
            throw new Error('Missing inbound connector');
        }
        this.utils = utils;
        this.inbound = inboundConnector;
        this.eventProcessor = new EventProcessor(this.options, this);
        this.rest = new SnowTransfer(this.options.token, this.options.rest || {});
    }

    async initialize() {
        if (this.cache && !this.cache.ready) {
            await this.cache.initialize();
        }
        if (this.voice && !this.voice.ready) {
            await this.voice.initialize();
        }
        if (!this.inbound.ready) {
            await this.inbound.initialize();
        }
        this.inbound.on('event', async (event) => {
            await this.eventProcessor.inbound(event);
        });
    }
}

module.exports = StarGear;
