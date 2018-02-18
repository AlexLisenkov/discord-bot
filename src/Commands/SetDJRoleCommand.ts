import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";
import Config from "../Config/Config";

export default class SetDJRoleCommand extends Command
{
    command: string = "dj role";
    adminOnly:boolean = true;

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        const role = message.guild.roles.find('name', parameter);
        if( !role ){
            message.reply(`Role ${parameter} not found`).then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }
        connection.database.djRole.data.set(role.id);
        message.reply(`The DJ role is now ${role.name}`).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });
    }
}