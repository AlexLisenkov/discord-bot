const Command = require('./Command');

class ClearQueueCommand extends Command
{
    command() {
        return "clearqueue";
    }

    handle(parameter, message, connection) {
        connection.truncate();

        connection.channel.send('`Queue cleared`');
    }
}

module.exports = ClearQueueCommand;