import Command from "./Command";
import YouTube from "../YouTube/YouTube";
import Song from "../YouTube/Song";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";
import Config from "../Config/Config";

export default class ForcePlayCommand extends Command
{
    command: string = "forceplay";
    requiresVoiceChannel: boolean = true;

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        YouTube.search(parameter).then((result:any) => {
            if( result instanceof Song ){
                result.author = message.author;
                connection.queue.unshift(result);
                connection.skip();
            } else {
                connection.channel.send(`I cannot force play a playlist`).then( (msg: Message) => {
                    msg.delete(Config.message_lifetime);
                });
            }
        }).catch((error) => {
            message.reply(error);
        });

    }
}