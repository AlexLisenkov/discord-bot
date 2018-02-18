import Command from "./Command";
import {Collection, Message, VoiceChannel} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import * as ytdl from 'ytdl-core';
import * as url from "url";
import Config from "../Config/Config";

export default class ShowDisallowedVoiceChannelsCommand extends Command
{
    command: string = "voicechannel show";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        const voiceChannels = message.guild.channels;

        let reply =
            {
                color: 0xA2E13D,
                author: {
                    'name': 'Blocked voice channels',
                    'url': 'https://discord.gg',
                },
                description: ''
            };


        connection.database.disallowedVoiceChannels.data.once('value').then( (row: firebase.database.DataSnapshot) => {
            for( let x in row.val() ){
                const name = voiceChannels.find('id', row.val()[x]).name;
                reply.description += `\n- ${name}`;
            }
            connection.channel.send('', {embed: reply}).then( (msg: Message) => {
                msg.delete(60000);
            });
        });
    }
}