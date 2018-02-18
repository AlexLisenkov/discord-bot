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

                if( this.adminOnly && !message.member.hasPermission('ADMINISTRATOR') ){
                    message.reply('You do not have the correct permission to run this command').then( (msg: Message) => {
                        msg.delete(Config.message_lifetime);
                    });
                    return;
                }

                const connect = VoiceConnections.getOrCreate(message);

                connect.then( (connection:VoiceConnection) => {
                    if( !this.requiresVoiceChannel || (this.requiresVoiceChannel && connection.voiceChannel !== undefined)){
                        this.handle(message.content.replace(Config.prefix+this.command, '').trim(), message, connection);
                        return true;
                    }
                    Command.setVoiceChannel(message, connection).then( (res:boolean) => {
                        if( res )
                            this.handle(message.content.replace(Config.prefix+this.command, '').trim(), message, connection);
                    });

                }).catch( err => {
                    message.reply(err);
                } );
            }
        });
    }

    public static setVoiceChannel(message:Message, connection:VoiceConnection):Promise<boolean> {
        if( connection.voiceChannel !== undefined )
            return new Promise<boolean>( (then) => {
                return then(true);
            } );

        if( message.member.voiceChannel === undefined) {
            message.reply('You must be in a voice channel to summon me')
                .then( (msg: Message) => {
                    msg.delete(Config.message_lifetime);
                });
            return new Promise<boolean>( (then) => {
                return then(false);
            } );
        }

        if( !message.member.voiceChannel.joinable ){
            message.reply('I am not allowed to join this channel')
                .then( (msg: Message) => {
                    msg.delete(Config.message_lifetime);
                });
            return new Promise<boolean>( (then) => {
                return then(false);
            } );
        }

        if( !message.member.voiceChannel.speakable ){
            message.reply('I am not able to play songs in this channel')
                .then( (msg: Message) => {
                    msg.delete(Config.message_lifetime);
                });
            return new Promise<boolean>( (then) => {
                return then(false);
            } );
        }

        return connection.database.disallowedVoiceChannels.data.orderByValue().equalTo(message.member.voiceChannel.id).once('value').then( (row: firebase.database.DataSnapshot) => {
            if (row.val() !== null) {
                message.reply(`I am not allowed to join this channel`).then((msg: Message) => {
                    msg.delete(Config.message_lifetime);
                });
                return false;
            } else {
                connection.voiceChannel = message.member.voiceChannel;
                connection.voiceChannel.join();
                return true;
            }
        });
    }

    public adminOnly:boolean = false;
    public requiresVoiceChannel:boolean = false;
    public abstract command:string;

    public abstract handle(parameter:string, message:Message, connection:VoiceConnection): void
}