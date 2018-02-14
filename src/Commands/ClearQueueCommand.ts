import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Command from "./Command";

export default class ClearQueueCommand extends Command
{
    public command:string = "clearqueue";

    public handle(parameter:string, message:Message, connection:VoiceConnection):void {
        connection.truncate();

        connection.channel.send('`Queue cleared`');
    }
}