import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";

export default class StopCommand extends Command
{
    command: string = "skip";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        connection.skip();
    }
}