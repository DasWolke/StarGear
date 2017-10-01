module.exports.StarGear = require('./src/StarGear');
module.exports = function (...args) {
    return new module.exports.StarGear(...args);
};