import Client from "../ActiveConnection/Client";
import VoiceConnections from "../ActiveConnection/VoiceConnections";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Config from "../Config/Config";

export default abstract class Command
{
    constructor() {
        Client.instance.on("message", (message:Message) => {
            if(message.author.bot) return;
            if( this.adminOnly && !message.member.hasPermission('ADMINISTRATOR') ){
                message.reply('You do not have the correct permission to run this command');
                return;
            }
            if (message.content.startsWith(Config.prefix+this.command)) {

                const connect = VoiceConnections.getOrCreate(message);

                connect.then( (connection:VoiceConnection) => {
                    this.handle(message.content.replace(Config.prefix+this.command, '').trim(), message, connection);
                }).catch( err => {
                    message.reply(err);
                } );
            }
        });
    }

    public adminOnly:boolean = false;
    public abstract command:string;

    public abstract handle(parameter:string, message:Message, connection:VoiceConnection): void
}