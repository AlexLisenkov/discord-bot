const Command = require('./Command');
const YouTube = require('../YouTube/YouTube');
const YouTubeConfig = require('../../youtube.config.json');
const queue = require('../Queue/queue');
const VoiceConnection = require('../ActiveConnection/VoiceConnection');

class PlayCommand extends Command
{
    command() {
        return ".play";
    }

    handle(parameter, message) {
        new Promise(resolve => {
            // @todo: Dont join when already joined
            message.member.voiceChannel.join().then( () => {
                resolve();
            });
        }).then( () => {
            YouTube.search(parameter).then(result => {
                queue.push(result);
                message.reply(`Queued up **${result.data.title}** on position ${queue.length}`);
                if( !VoiceConnection.isTriggered() )
                    VoiceConnection.play();
            }).catch((error) => {
                message.reply(error);
            });
        }).catch((error) => {
            console.log(error);
        });

    }
}

module.exports = PlayCommand;