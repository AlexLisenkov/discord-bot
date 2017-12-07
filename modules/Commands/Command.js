const Client = require('../ActiveConnection/Client');
const VoiceConnections = require('../ActiveConnection/VoiceConnections');
const config = require('../../config.json');

class Command
{
    constructor() {
        Client.instance.on("message", message => {
            if(message.author.bot) return;
            if (message.content.startsWith(config.prefix+this.command())) {
                const connect = VoiceConnections.getOrCreate(message);

                connect.then( (connection) => {
                    this.handle(message.content.replace(config.prefix+this.command(), ''), message, connection);
                }).catch( err => {
                    message.reply(err);
                } );
            }
        });
    }

    command() {
        // void
    }

    handle(parameter, message, connection) {
        // void
    }
}

module.exports = Command;