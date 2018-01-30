/**
 * Class responsible for applying middleware before an event is emitted to the user of the library
 */
class MiddlewareHandler {
    /**
     * Create a new middleware handler
     * @param cache - cache instance passed to the middleware
     * @param rest - rest instance passed to the middleware
     * @property {Object} middleware - Object with a collection of middlewares, keyed by event name
     */
    constructor(cache, rest) {
        this.cache = cache;
        this.rest = rest;
        this.middleware = {};
    }

    /**
     * Add a middleware to the stack of middlewares
     * @param {String|String[]} events - Single event name or array of event names that define when the passed function should be called
     * @param {Function} fn - Function that get's called when a match occurs, may be an async function, parameters passed to the function are event, cache, rest
     */
    addMiddleware(events, fn) {
        if (typeof events === 'function') {
            fn = events;
            events = 'all';
        }
        if (!Array.isArray(events)) {
            events = [events];
        }
        for (let event of events) {
            if (!Array.isArray(this.middleware[event])) {
                this.middleware[event] = [];
            }
            this.middleware[event].push(fn);
        }
    }

    /**
     * Apply all fitting middlewares to an incoming event
     * @param {Object} event - incoming raw discord event object
     * @return {Promise<Object>} - the processed event object
     */
    async applyMiddleware(event) {
        if (this.middleware['all']) {
            for (let mw of this.middleware['all']) {
                event = await mw(event, this.cache, this.rest);
            }
        }
        if (this.middleware[event.t]) {
            for (let mw of this.middleware[event.t]) {
                event = await mw(event, this.cache, this.rest);
            }
        }
        return event;
    }
}

module.exports = MiddlewareHandler;
