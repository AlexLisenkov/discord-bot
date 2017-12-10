const Client = require('../ActiveConnection/Client');
const VoiceConnections = require('../ActiveConnection/VoiceConnections');
const config = require('../../config.json');
const permissions = require('../../permissions.json');

class Command
{
    constructor() {
        Client.instance.on("message", message => {
            if(message.author.bot) return;
            if (message.content.startsWith(config.prefix+this.command())) {

                if( permissions[this.command()] !== undefined && permissions[this.command()].length > 0 ){
                    let permit = false;
                    message.member.roles.forEach( (V, K) => {
                        if( permissions[this.command()].indexOf(V.name) !== -1 )
                            permit = true;
                    });

                    if( !permit )
                        return message.reply('I\'m sorry, you don\'t have the right role to execute this command');
                }


                const connect = VoiceConnections.getOrCreate(message);

                connect.then( (connection) => {
                    this.handle(message.content.replace(config.prefix+this.command(), '').trim(), message, connection);
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