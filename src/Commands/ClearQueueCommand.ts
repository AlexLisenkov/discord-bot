import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Command from "./Command";
import Config from "../Config/Config";

export default class ClearQueueCommand extends Command
{
    public command:string = "clearqueue";

    public handle(parameter:string, message:Message, connection:VoiceConnection):void {
        connection.truncate();

        connection.channel.send('`Queue cleared`').then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });;
    }
}