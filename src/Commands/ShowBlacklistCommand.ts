import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import * as ytdl from 'ytdl-core';
import * as url from "url";

export default class ShowBlacklistCommand extends Command
{
    command: string = "blacklist show";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        let reply =
            {
                color: 0xA2E13D,
                author: {
                    'name': 'Blacklist',
                    'url': 'https://discord.gg',
                },
                description: ''
            };

        connection.database.blacklist.data.once('value').then( (row: firebase.database.DataSnapshot) => {
            for( let x in row.val() )
                reply.description += `\n- [${row.val()[x]}](https://youtube.com/watch?v=${row.val()[x]})`;
            connection.channel.send('', {embed: reply});
        });
    }
}