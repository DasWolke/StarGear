const BaseRatelimitStorage = require('./BaseRatelimitStorage');

class MapRatelimitStorage extends BaseRatelimitStorage {
    constructor() {
        super();
    }
}

module.exports = MapRatelimitStorage;
