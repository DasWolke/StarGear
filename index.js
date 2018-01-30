const Stargear = require('./src/StarGear');

function StarGear(...args) {
    return new Stargear(...args);
}

StarGear.Connectors = {
    AmqpConnector: require('./src/connector/AmqpConnector'),
    BaseConnector: require('./src/connector/BaseConnector'),
    DirectConnector: require('./src/connector/DirectConnector')
};
StarGear.middleware = {
    memberMiddleware: require('./src/middleware/memberMiddleware')
};
StarGear.EventProcessor = require('./src/EventProcessor');
StarGear.PermissionProcessor = require('./src/PermissionsProcessor');
module.exports = StarGear;
