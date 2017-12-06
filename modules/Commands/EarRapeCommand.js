const Command = require('./Command');
const VoiceConnection = require('../ActiveConnection/VoiceConnection');
const YouTube = require('../YouTube/YouTube');
const queue = require('../Queue/queue');

class EarRapeCommand extends Command
{
    command() {
        return ".rapeme";
    }

    handle(parameter, message) {
        const data = {
            "data": {
                "title": " 🎶❤️❤❤️❤❤❤️❤️ "
            },
            "stream": YouTube.RANDOM_RAPE_STREAM
        };
        new Promise(resolve => {
            // @todo: Dont join when already joined
            message.member.voiceChannel.join().then( () => {
                resolve();
            });
        }).then( () => {
            queue.push(data);
            message.reply(`Queued up **🎶❤️** on position ${queue.length}`);
            if( !VoiceConnection.isTriggered() )
                VoiceConnection.play();
        }).catch((error) => {
            console.log(error);
        });
    }
}

module.exports = EarRapeCommand;