import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";
import Config from "../Config/Config";

export default class SetPrefixCommand extends Command
{
    command: string = "prefix";
    adminOnly:boolean = true;

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        connection.database.guildConfig.setKey('prefix').data.set(parameter);
        message.reply(`Command prefix is now '${parameter}'`).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });
    }
}