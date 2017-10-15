const Stargear = require('./src/StarGear');

function StarGear(...args) {
    return new Stargear(...args);
}

StarGear.Connectors = {
    AmqpConnector: require('./src/connector/AmqpConnector'),
    BaseConnector: require('./src/connector/BaseConnector')
};
module.exports = StarGear;