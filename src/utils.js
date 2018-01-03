const constants = require('./constants');

/**
 * Get's the full avatar url from a user
 * @param {User} user - Discord user object
 * @param {String} [fileType=png] - file type of the image
 * @param {Number} [size=128] - size of the image
 * @return {string} - Full url to the cdn hosted avatar
 */
function getAvatarUrl(user, fileType = 'png', size = 128) {
    return `${constants.CDN_HOST}/avatars/${user.id}/${user.avatar}.${fileType}?size=${size}`;
}

module.exports = {getAvatarUrl};
