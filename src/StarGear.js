let EventEmitter;
try {
    EventEmitter = require('eventemitter3');
} catch (e) {
    EventEmitter = require('events').EventEmitter;
}
const SnowTransfer = require('snowtransfer');
const EventProcessor = require('./EventProcessor');
const MiddlewareHandler = require('./MiddlewareHandler');
const utils = require('./utils');

/**
 * Base class of the framework
 * @extends EventEmitter
 */
class StarGear extends EventEmitter {
    /**
     * Create a new StarGear instance (has to be bootstrapped via initialize())
     * @param {Object} options - object with options passed to StarGear
     * @param {RainCache} options.cache - cache instance to use
     * @param {SandySounds} options.voice - voice instance to use
     * @param {BaseConnector} inboundConnector - inbound connector used for receiving events from an mq, event emitter, etc..
     * @property {RainCache} cache - cache class to be used for loading additional data about received events
     * @property {SnowTransfer} rest - rest client of the framework
     * @property {EventProcessor} eventProcessor - class responsible for processing incoming events
     * @property {utils} utils - object with util functions for ease of usability
     * @property {MiddlewareHandler} middlewareHandler - middlewareHandler used for handling any added middlewares once an event comes in
     * @property {BaseConnector} inbound - connector used for receiving incoming events
     */
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
        this.middlewareHandler = new MiddlewareHandler(this.cache, this.rest);
    }

    /**
     * Initialize the framework by bootstrapping the individual components
     * @return {Promise<void>} - returns a promise that resolves once all components initialized successfully
     */
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
            event = await this.middlewareHandler.applyMiddleware(event);
            await this.eventProcessor.inbound(event);
        });
    }

    /**
     * Add a middleware to stargear
     * @param {String, String[]} events - Name or list of names of events this middleware should be applied to
     * @param {Function} fn - function that gets called once the middleware should be applied
     */
    use(events, fn) {
        this.middlewareHandler.addMiddleware(events, fn);
    }
}

module.exports = StarGear;
