import {Message} from "discord.js";
import Client from "../ActiveConnection/Client";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Command from "./Command";

export default class ChangeNicknameCommand extends Command
{
    public command:string = "nickname";

    public handle(parameter:string, message:Message, connection:VoiceConnection):void {
        Client.instance.user.setUsername(parameter);
    }
}

