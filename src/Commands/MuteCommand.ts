import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";

export default class MuteCommand extends Command
{
    command: string = "mute";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        connection.mute();
    }
}