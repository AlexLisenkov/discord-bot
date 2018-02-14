import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";

export default class PauseCommand extends Command
{
    command: string = "pause";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        connection.pause();
    }
}