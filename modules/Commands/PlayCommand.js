const Command = require('./Command');
const YouTube = require('../YouTube/YouTube');

class PlayCommand extends Command
{
    command() {
        return "play";
    }

    handle(parameter, message, connection) {
        YouTube.search(parameter).then(result => {
            if( typeof result.data != 'undefined' ){
                result['author'] = message.author.username;
                connection.push(result);
            } else {
                connection.channel.send(`Loaded ${result.length} songs from playlist`);
                for (let i = 0; i < result.length; i++) {
                    result[i]['author'] = message.author.username;
                    connection.push(result[i], false);
                }
            }
        }).catch((error) => {
            message.reply(error);
        });

    }
}

module.exports = PlayCommand;