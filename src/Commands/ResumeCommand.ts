import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";

export default class ResumeCommand extends Command
{
    command: string = "resume";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        connection.resume();
    }
}