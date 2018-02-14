import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";

export default class UnmuteCommand extends Command
{
    command: string = "unmute";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        connection.unMute();
    }
}