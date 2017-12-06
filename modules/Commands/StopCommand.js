const Command = require('./Command');
const queue = require('../Queue/queue');
const VoiceConnection = require('../ActiveConnection/VoiceConnection');

class StopCommand extends Command
{
    command() {
        return ".skip";
    }

    handle(parameter, message) {
        VoiceConnection.skip();
    }
}

module.exports = StopCommand;