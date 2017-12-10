const Command = require('./Command');

class SetVolumeCommand extends Command
{
    command() {
        return "volume";
    }

    handle(parameter, message, connection) {
        parameter = parameter / 100;
        connection.setVolume(parameter);
    }
}

module.exports = SetVolumeCommand;