class EventProcessor {
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
            case 'MESSAGE_CREATE':
                this.client.emit('messageCreate', event.d);
                break;
            default:
                console.log(event);
                break;
        }
    }
}

module.exports = EventProcessor;
