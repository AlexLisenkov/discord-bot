const Command = require('./Command');
const YouTube = require('../YouTube/YouTube');
class EarRapeCommand extends Command
{
    command() {
        return "rapeme";
    }

    handle(parameter, message, connection) {
        if( !YouTube.earRapeEnabled() )
            return;

        const data = {
            "data": {
                "title": "👌💯🔥🤷"
            },
            "stream": YouTube.RANDOM_RAPE_STREAM,
            'author': message.author.username
        };

        connection.push(data);
    }
}

module.exports = EarRapeCommand;