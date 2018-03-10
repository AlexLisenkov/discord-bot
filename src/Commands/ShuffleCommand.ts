import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Config from "../Config/Config";

export default class ShuffleCommand extends Command
{
    command: string = "shuffle";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        if( !connection.triggered || connection.queue.length < 1 ) {
            message.reply('There\'s no queue 🙁, type in \'*' + connection.prefix + 'play [song title]*\' to start');
            return null;
        }

        connection.shuffle();

        const reply =
            {
                title: `🔀 Songs shuffled`,
                footer: {
                    'text': `Shuffled by ${message.author.username}`
                }
            };

        connection.channel.send('', {embed: reply}).then( (msg: Message) => {
            msg.delete(30000);
        });
    }
}