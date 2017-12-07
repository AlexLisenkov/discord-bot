const Command = require('./Command');
const YouTube = require('../YouTube/YouTube');
const VoiceConnections = require('../ActiveConnection/VoiceConnections');

class PlayCommand extends Command
{
    command() {
        return "play";
    }

    handle(parameter, message, connection) {
        YouTube.search(parameter).then(result => {
            result['author'] = message.author.username;
            connection.push(result);
        }).catch((error) => {
            message.reply(error);
        });

    }
}

module.exports = PlayCommand;