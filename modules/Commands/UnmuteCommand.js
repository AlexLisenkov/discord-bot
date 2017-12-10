const Command = require('./Command');

class UnmuteCommand extends Command
{
    command() {
        return "unmute";
    }

    handle(parameter, message, connection) {
        connection.unMute();
    }
}

module.exports = UnmuteCommand;