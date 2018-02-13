const Command = require('./Command');

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