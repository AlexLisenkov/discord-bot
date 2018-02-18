import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Config from "../Config/Config";

export default class QueueCommand extends Command
{
    command: string = "queue";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        if( !connection.triggered || connection.queue.length < 1 ) {
            message.reply('There\'s no queue 🙁, type in \'*' + Config.prefix + 'play [song title]*\' to start');
            return null;
        }

        const reply =
            {
                color: 0xA2E13D,
                author: {
                    'name': '🔻 Playlist',
                    'url': 'https://discord.gg',
                },
                description: ''
            };

        for ( let i = 0; i < connection.queue.length; i++){
            reply.description += `**[${i+1}]**: ${connection.queue[i].snippet.title}\n`;
            if( i >= 19 ) {
                reply.description += `\n Showing ${i+1} of ${connection.queue.length} total`;
                break;
            }
        }

        connection.channel.send('', {embed: reply}).then( (msg: Message) => {
            msg.delete(30000);
        });
    }
}