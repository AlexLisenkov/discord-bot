const Command = require('./Command');

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