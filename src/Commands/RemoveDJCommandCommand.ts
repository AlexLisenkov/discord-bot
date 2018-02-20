import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";
import Config from "../Config/Config";
import SetDJCommandCommand from "./SetDJCommandCommand";

export default class RemoveDJCommandCommand extends Command
{
    command: string = "dj remove";
    adminOnly:boolean = true;

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        if( !SetDJCommandCommand.availableCommands.find( (it) => { return it.toLowerCase() === parameter.toLowerCase() })){
            message.reply(`This command does not exist, type ${connection.prefix}help for available commands`).then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }
        connection.database.djCommands.setKey(parameter).data.set(false);
        message.reply(`'${parameter}' is now publicly available`).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });
    }
}