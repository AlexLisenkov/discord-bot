const Command = require('./Command');
const VoiceConnection = require('../ActiveConnection/VoiceConnection');

class PlayCommand extends Command
{
    command() {
        return ".resume";
    }

    handle(parameter, message) {
        VoiceConnection.resume();
    }
}

module.exports = PlayCommand;