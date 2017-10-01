'use strict';

const StarGear = require('../src/StarGear');
const RainCache = require('raincache');
let RedisEngine = RainCache.Engines.RedisStorageEngine;
const cache = new RainCache({storage: {default: new RedisEngine({host: 'localhost'})}, debug: false});
const AmqpConnector = require('../src/connector/AmqpConnector');
let con = new AmqpConnector({});
let bot = new StarGear({cache}, con);
bot.on('messageCreate', async (msg) => {
    let channel = await bot.cache.channel.get(msg.channel_id);
    console.log(channel);
    console.log(`${msg.author.username}#${msg.author.discriminator}: ${msg.content}`);
});
let init = async () => {
    await bot.initialize();
};
init().then(() => {
    console.log('initialized successfully');
}).catch(e => console.error(e));