import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";
import Config from "../Config/Config";

export default class MoveCommand extends Command
{
    command: string = "move";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        if( connection.queue.length == 0 ){
            message.reply('There is no queue').then((msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }
        const indexes = parameter.split(' ');
        if( indexes.length != 2 ){
            message.reply('This commands requires two parameters').then((msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }
        const oldIndex = parseInt(indexes[0]) - 1;
        const newIndex = parseInt(indexes[1]) - 1;

        if( isNaN(oldIndex) || isNaN(newIndex) ){
            message.reply('This commands requires parameters to be numeric').then((msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }

        connection.move(oldIndex, newIndex);

        const song = connection.queue[newIndex];

        const reply =
            {
                color: 0xf45342,
                title: song.snippet.title,
                url: song.url,
                description: `Repositioned form ${oldIndex+1} to ${newIndex+1}`,
                thumbnail: {
                    "url": song.snippet.thumbnails.default.url
                },
                author: {
                    'name': '↪️ Song moved',
                    'url': 'https://discord.gg',
                },
                footer: {
                    'text': `Moved by ${message.author.username}`
                }
            };

        connection.channel.send('', {embed: reply}).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });
    }
}