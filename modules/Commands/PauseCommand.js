const Command = require('./Command');
const VoiceConnection = require('../ActiveConnection/VoiceConnection');

class PlayCommand extends Command
{
    command() {
        return "pause";
    }

    handle(parameter, message, connection) {
        connection.pause();
    }
}

module.exports = PlayCommand;