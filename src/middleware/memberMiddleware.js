/**
 * Simple middleware which adds the member and the channel to an event (MESSAGE_CREATE)
 * @param {Object} event - discord event
 * @param cache - cache instance from stargear
 * @param rest - rest instance from stargear
 * @return {Promise<Object>} - the processed event
 */
module.exports = async function (event, cache, rest) {
    if (!event.d.channel_id) {
        return event;
    }
    let channel = await cache.channel.get(event.d.channel_id);
    event.d.channel = channel.boundObject;
    if (channel.guild_id) {
        let member = await cache.member.get(event.d.author.id, channel.guild_id);
        event.d.member = member.boundObject;
    }
    return event;
};
