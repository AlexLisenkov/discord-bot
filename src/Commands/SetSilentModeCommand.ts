import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";
import Config from "../Config/Config";

export default class SetSilentModeCommand extends Command
{
    command: string = "conf silent";
    adminOnly:boolean = true;

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        if( parameter == '1' || parameter == 'enabled' || parameter == 'true' || parameter == 'y' || parameter == '👍'){
            connection.database.guildConfig.setKey('silent').data.set(true);
            message.reply(`I am now in silent mode`).then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
        } else {
            connection.database.guildConfig.setKey('silent').data.set(false);
            message.reply(`Silent mode disabled`).then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
        }
    }
}