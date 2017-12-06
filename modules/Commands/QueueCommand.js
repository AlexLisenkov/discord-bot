const Command = require('./Command');
const VoiceConnection = require('../ActiveConnection/VoiceConnection');
const queue = require('../Queue/queue');

class PlayCommand extends Command
{
    command() {
        return ".queue";
    }

    handle(parameter, message) {
        if( !VoiceConnection.isTriggered() || queue.length < 1 )
            return message.reply('There\'s no queue 🙁, type in \'*.play [song title]*\' to start');

        let reply = '```markdown\n';

        for ( let i = 0; i < queue.length; i++){
            reply += `[${i+1}]: #${queue[i].data.title}\n`;
        }

        reply += "\n```";

        message.reply(reply);
    }
}

module.exports = PlayCommand;