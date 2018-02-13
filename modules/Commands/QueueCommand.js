const Command = require('./Command');
const config = require('../../config');

class PlayCommand extends Command
{
    command() {
        return "queue";
    }

    handle(parameter, message, connection) {
        if( !connection.triggered || connection.length < 1 )
            return message.reply('There\'s no queue 🙁, type in \'*'+config.prefix+'play [song title]*\' to start');

        const reply =
            {
                color: 0xA2E13D,
                author: {
                    'name': '🔻 Playlist',
                    'url': 'https://discord.gg',
                },
                description: ''
            };


        for ( let i = 0; i < connection.length; i++){
            reply.description += `**[${i+1}]**: ${connection.queue[i].snippet.title}\n`;
            if( i >= 24 ) {
                reply.description += `\n Showing ${i+1} of ${connection.length} total`;
                break;
            }
        }


        connection.channel.send('', {embed: reply});
    }
}

module.exports = PlayCommand;