import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";

export default class JoinCommand extends Command
{
    command: string = "join";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        Command.setVoiceChannel(message, connection, false);
    }
}