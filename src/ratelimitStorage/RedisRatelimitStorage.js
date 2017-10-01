const BaseRatelimitStorage = require('./BaseRatelimitStorage');

class RedisRatelimitStorage extends BaseRatelimitStorage {
    constructor() {
        super();
    }
}

module.exports = RedisRatelimitStorage;
