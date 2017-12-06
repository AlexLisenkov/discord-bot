const Command = require('./Command');
const Client = require('../ActiveConnection/Client');
const VoiceConnections = require('../ActiveConnection/VoiceConnection');

class PlayCommand extends Command
{
    command() {
        return ".disconnect";
    }

    handle(parameter, message) {
        VoiceConnections.truncate();
        Client.instance.voiceConnections.forEach(V => {
            V.disconnect();
        })
    }
}

module.exports = PlayCommand;