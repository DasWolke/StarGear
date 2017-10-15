let StarGear = require('./src/StarGear');
module.exports.StarGear = StarGear;
module.exports.Connectors = {
    AmqpConnector: require('./src/connector/AmqpConnector'),
    BaseConnector: require('./src/connector/BaseConnector')
};
module.exports = function (...args) {
    return new StarGear(...args);
};