const Command = require('./Command');
const Client = require('../ActiveConnection/Client');

class ChangeNicknameCommand extends Command
{
    command() {
        return "nickname";
    }

    handle(parameter, message) {
        Client.instance.user.setUsername(parameter);
    }
}

module.exports = ChangeNicknameCommand;