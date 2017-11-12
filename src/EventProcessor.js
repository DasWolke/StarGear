/**
 * EventProcessor used for triggering events based on incoming events
 * @property {Object} options
 * @property {StarGear} client
 */
class EventProcessor {
    /**
     * Create a new EventProcessor
     * @param {Object} options
     * @param {Object} [options.disabledEvents] - Events to disable, those events will not be processed/emitted
     * @param {StarGear} starGear
     */
    constructor(options, starGear) {
        this.options = {disabledEvents: {PRESENCE_UPDATE: true, TYPING_START: true}};
        Object.assign(this.options, options);
        this.client = starGear;
    }

    async inbound(event) {
        if (this.options.disabledEvents[event.t]) {
            return;
        }
        return this.process(event);
    }

    async process(event) {
        switch (event.t) {
            case 'PRESENCE_UPDATE':
                this.client.emit('presenceUpdate', event.d);
                break;
            case 'MESSAGE_CREATE':
                this.client.emit('messageCreate', event.d);
                break;
            case 'MESSAGE_UPDATE':
                this.client.emit('messageUpdate', event.d);
                break;
            case 'MESSAGE_DELETE':
                this.client.emit('messageDelete', event.d);
                break;
            case 'MESSAGE_DELETE_BULK':
                this.client.emit('messageDeleteBulk', event.d);
                break;
            case 'MESSAGE_REACTION_ADD':
                this.client.emit('messageReactionAdd', event.d);
                break;
            case 'MESSAGE_REACTION_REMOVE':
                this.client.emit('messageReactionRemove', event.d);
                break;
            case 'GUILD_BAN_ADD':
                this.client.emit('guildBanAdd', event.d);
                break;
            case 'GUILD_BAN_REMOVE':
                this.client.emit('guildBanRemove', event.d);
                break;
            case 'GUILD_MEMBER_ADD':
                this.client.emit('guildMemberAdd', event.d);
                break;
            case 'GUILD_MEMBER_UPDATE':
                this.client.emit('guildMemberUpdate', event.d);
                break;
            case 'GUILD_MEMBER_REMOVE':
                this.client.emit('guildMemberRemove', event.d);
                break;
            case 'CHANNEL_CREATE':
                this.client.emit('channelCreate', event.d);
                break;
            case 'CHANNEL_UPDATE':
                this.client.emit('channelUpdate', event.d);
                break;
            case 'CHANNEL_DELETE':
                this.client.emit('channelDelete', event.d);
                break;
            case 'CHANNEL_PINS_UPDATE':
                this.client.emit('channelPinUpdate', event.d);
                break;
            case 'GUILD_CREATE':
                this.client.emit('guildCreate', event.d);
                break;
            case 'GUILD_UPDATE':
                this.client.emit('guildUpdate', event.d);
                break;
            case 'GUILD_REMOVE':
                this.client.emit('guildRemove', event.d);
                break;
            case 'GUILD_EMOJIS_UPDATE':
                this.client.emit('guildEmojiUpdate', event.d);
                break;
            case 'USER_UPDATE':
                this.client.emit('userUpdate', event.d);
                break;
            case 'VOICE_STATE_UPDATE':
                this.client.emit('voiceStateUpdate', event.d);
                break;
            default:
                console.error(event);
                break;
        }
    }
}

module.exports = EventProcessor;
