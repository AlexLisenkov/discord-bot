import Command from "./Command";
import {Collection, Message, VoiceChannel} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import * as ytdl from 'ytdl-core';
import * as url from "url";
import Config from "../Config/Config";

export default class RemoveDisallowVoiceChannelsCommand extends Command
{
    command: string = "voicechannel allow";
    adminOnly: boolean = true;

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        if( parameter == ''){
            message.reply('Missing required parameter `channel name`').then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }

        const voiceChannels = message.guild.channels.findAll('type', 'voice');
        let found = false;

        for( let x in voiceChannels ) {
            let channel = null;
            if (parameter.toLowerCase() == voiceChannels[x].name.toLowerCase()) {
                found = true;
                channel = voiceChannels[x];
            } else {
                continue;
            }

            connection.database.disallowedVoiceChannels.data.orderByValue().equalTo(channel.id).once('value').then( (row: firebase.database.DataSnapshot) => {
                if (row.val() !== null) {
                    for( let i in row.val() ){
                        row.ref.child(i).remove();
                    };
                    message.reply(`Channel removed from blacklist`).then( (msg: Message) => {
                        msg.delete(Config.message_lifetime);
                    });
                } else {
                    message.reply(`Channel '${parameter}' not blocked`).then( (msg: Message) => {
                        msg.delete(Config.message_lifetime);
                    });
                }
            });
        }

        if( !found ){
            message.reply(`Could not find a voice channel named '${parameter}'`).then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }
    }
}