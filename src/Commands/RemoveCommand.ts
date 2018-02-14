import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";

export default class RemoveCommand extends Command
{
    command: string = "remove";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        const index = parseInt(parameter)-1;
        const song = connection.queue[index];
        connection.removeIndex(index);

        const reply =
            {
                color: 0xf45342,
                title: song.snippet.title,
                url: song.url,
                description: song.snippet.channelTitle,
                thumbnail: {
                    "url": song.snippet.thumbnails.default.url
                },
                author: {
                    'name': '❌ Song removed from queue',
                    'url': 'https://discord.gg',
                },
                footer: {
                    'text': `Removed by ${message.author.username}`
                }
            };

        connection.channel.send('', {embed: reply});
    }
}