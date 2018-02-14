import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";

export default class NowPlayingCommand extends Command
{
    command: string = "np";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        if( !connection.currentSong ){
            message.reply('`I\'m not playing anything`');
            return null;
        }

        const song = connection.currentSong;
        const embed =
            {
                title: song.snippet.title,
                url: song.url,
                description: song.snippet.channelTitle,
                thumbnail: {
                    "url": song.snippet.thumbnails.default.url
                },
                author: {
                    'name': '🎶 Now playing',
                    'url': 'https://discord.gg',
                },
                footer: {
                    'text': `Added by ${song.author.username}`
                }
            };
        connection.channel.send('', {embed: embed})
    }
}