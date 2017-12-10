const Command = require('./Command');

class RemoveCommand extends Command
{
    command() {
        return "remove";
    }

    handle(parameter, message, connection) {
        connection.removeIndex(parseInt(parameter)-1);
    }
}

module.exports = RemoveCommand;