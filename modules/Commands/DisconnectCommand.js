const Command = require('./Command');
const Client = require('../ActiveConnection/Client');
const VoiceConnections = require('../ActiveConnection/VoiceConnection');

class PlayCommand extends Command
{
    command() {
        return "disconnect";
    }

    handle(parameter, message, connection) {
        connection.disconnect();
    }
}

module.exports = PlayCommand;