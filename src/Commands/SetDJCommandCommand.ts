import Command from "./Command";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";
import Config from "../Config/Config";

export default class SetDJCommandCommand extends Command
{
    command: string = "dj require";
    adminOnly:boolean = true;

    static availableCommands:string[] = [
        'blacklist add',
        'blacklist allow',
        'blacklist remove',
        'blacklist show',
        'clearqueue',
        'disconnect',
        'dj remove',
        'dj require',
        'dj role',
        'forceplay',
        'mute',
        'nickname',
        'np',
        'pause',
        'play',
        'prefix',
        'queue',
        'remove',
        'resume',
        'shuffle',
        'skip',
        'unmute',
        'voicechannel allow',
        'voicechannel disallow',
        'voicechannel show',
        'volume'
    ];

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        if( !SetDJCommandCommand.availableCommands.find( (it) => { return it.toLowerCase() === parameter.toLowerCase() })){
            message.reply(`This command does not exist, type ${connection.prefix}help for available commands`).then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }
        connection.database.djCommands.setKey(parameter).data.set(true);
        message.reply(`'${parameter}' is now DJ-only`).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });
    }
}