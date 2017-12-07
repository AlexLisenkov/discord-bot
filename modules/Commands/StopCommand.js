const Command = require('./Command');
const VoiceConnection = require('../ActiveConnection/VoiceConnection');

class StopCommand extends Command
{
    command() {
        return "skip";
    }

    handle(parameter, message, connection) {
        connection.skip();
    }
}

module.exports = StopCommand;