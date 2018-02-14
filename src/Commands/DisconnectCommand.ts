import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";

export default class DisconnectCommand extends Command
{
    command: string = "disconnect";

    public handle(parameter:string, message:Message, connection:VoiceConnection):void {
        connection.disconnect();
    }
}