import Command from "./Command";
import YouTube from "../YouTube/YouTube";
import Song from "../YouTube/Song";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";
import Config from "../Config/Config";

export default class PlayCommand extends Command
{
    command: string = "play";
    requiresVoiceChannel: boolean = true;

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        YouTube.search(parameter).then((result:any) => {
            if( result instanceof Song ){
                result.author = message.author;
                connection.pushToQueue(result);
            } else {
                connection.channel.send(`Loaded ${result.length} songs from playlist`).then( (msg: Message) => {
                    msg.delete(Config.message_lifetime);
                });
                for (let i = 0; i < result.length; i++) {
                    result[i].author = message.author;
                    connection.pushToQueue(result[i], false);
                }
            }
        }).catch((error) => {
            message.reply(error);
        });

    }
}