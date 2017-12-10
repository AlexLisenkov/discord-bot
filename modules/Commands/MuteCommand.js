const Command = require('./Command');

class MuteCommand extends Command
{
    command() {
        return "mute";
    }

    handle(parameter, message, connection) {
        connection.mute();
    }
}

module.exports = MuteCommand;