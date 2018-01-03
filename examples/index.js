'use strict';
const config = require('./config.json');
const StarGear = require('../src/StarGear');
const RainCache = require('raincache');
let RedisEngine = RainCache.Engines.RedisStorageEngine;
const cache = new RainCache({storage: {default: new RedisEngine({host: 'localhost'})}, debug: false});
const AmqpConnector = require('../src/connector/AmqpConnector');
let con = new AmqpConnector({});
let bot = new StarGear({cache, token: config.token}, con);
bot.on('messageCreate', async (msg) => {
    let channel = await bot.cache.channel.get(msg.channel_id);
    console.log(`${channel.name}: ${msg.author.username}#${msg.author.discriminator}: ${msg.content}`);
    if (msg.content === 'example ping') {
        let time = Date.now();
        let pingMsg = await bot.rest.channel.createMessage(msg.channel_id, 'pong');
        return bot.rest.channel.editMessage(msg.channel_id, pingMsg.id, `pong \`${Date.now() - time}ms\``);
    }
});
let init = async () => {
    await bot.initialize();
};
init().then(() => {
    console.log('initialized successfully');
}).catch(e => console.error(e));