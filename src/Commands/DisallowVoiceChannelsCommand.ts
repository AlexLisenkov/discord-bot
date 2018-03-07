import Command from "./Command";
import {Collection, Message, VoiceChannel} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import * as ytdl from 'ytdl-core';
import * as url from "url";
import Config from "../Config/Config";

export default class DisallowVoiceChannelsCommand extends Command
{
    command: string = "voicechannel disallow";
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
                channel = voiceChannels[x];
                found = true;
            } else {
                continue;
            }

            connection.database.disallowedVoiceChannels.data.orderByValue().equalTo(channel.id).once('value').then((row: firebase.database.DataSnapshot) => {
                if (row.val() !== null) {
                    message.reply(`Channel already blocked`).then((msg: Message) => {
                        msg.delete(Config.message_lifetime);
                    });
                } else {
                    connection.database.disallowedVoiceChannels.data.push(channel.id);
                    message.reply(`Channel added '${parameter}' to blacklist`).then((msg: Message) => {
                        msg.delete(Config.message_lifetime);
                    });
                }
            });
        }

        if (!found) {
            message.reply(`Could not find a voice channel named '${parameter}'`).then((msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }
    }
}