import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";
import Config from "../Config/Config";

export default class NowPlayingCommand extends Command
{
    command: string = "np";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        if( !connection.currentSong ){
            message.reply('`I\'m not playing anything`').then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });;
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
        connection.channel.send('', {embed: embed}).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });
    }
}