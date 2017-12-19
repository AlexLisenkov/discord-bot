const Command = require('./Command');

class PlayCommand extends Command
{
    command() {
        return "queue";
    }

    handle(parameter, message, connection) {
        if( !connection.triggered || connection.length < 1 )
            return message.reply('There\'s no queue 🙁, type in \'*play [song title]*\' to start');

        let reply = '```markdown\n';

        for ( let i = 0; i < connection.length; i++){
            reply += `[${i+1}]: ${connection.queue[i].data.title}\n`;
            if( i >= 9 ) {
                reply += `\n Showing ${i+1} of ${connection.length} total`;
                break;
            }
        }

        reply += "\n```";

        message.reply(reply);
    }
}

module.exports = PlayCommand;