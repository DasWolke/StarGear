'use strict';
const BaseConnector = require('./BaseConnector');
const API_VERSION = require('../constants').API_VERSION;

class DiscordRestConnector extends BaseConnector {
    constructor(options) {
        super();
        this.options = {apiVersion: API_VERSION};
        Object.assign(this.options, options);
    }

}

module.exports = DiscordRestConnector;
