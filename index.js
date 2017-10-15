let StarGear = require('./src/StarGear');
module.exports.StarGear = StarGear;
module.exports = function (...args) {
    return new StarGear(...args);
};