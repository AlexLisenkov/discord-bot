const Client = require('../ActiveConnection/Client');

class Command
{
    constructor() {
        Client.instance.on("message", message => {
            if(message.author.bot) return;
            if (message.content.startsWith(this.command())) {
                this.handle(message.content.replace(this.command(), ''), message);
            }
        })
    }

    command() {
        // void
    }

    handle(parameter, message) {
        // void
    }
}

module.exports = Command;