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
            if (message.content.startsWith(Config.prefix+this.command)) {

/*                if( permissions[this.command()] !== undefined && permissions[this.command()].length > 0 ){
                    let permit = false;
                    message.member.roles.forEach( (V, K) => {
                        if( permissions[this.command()].indexOf(V.name) !== -1 )
                            permit = true;
                    });

                    if( !permit )
                        return message.reply('I\'m sorry, you don\'t have the right role to execute this command');
                }*/


                const connect = VoiceConnections.getOrCreate(message);

                connect.then( (connection:VoiceConnection) => {
                    this.handle(message.content.replace(Config.prefix+this.command, '').trim(), message, connection);
                }).catch( err => {
                    message.reply(err);
                } );
            }
        });
    }

    public abstract command:string;

    public abstract handle(parameter:string, message:Message, connection:VoiceConnection): void
}