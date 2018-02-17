import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import * as ytdl from 'ytdl-core';
import * as url from "url";
import {error} from "util";
import value from "*.json";

export default class RemoveFromBlacklistCommand extends Command
{
    command: string = "blacklist remove";
    adminOnly: boolean = true;

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        connection.database.blacklist.data.orderByValue().equalTo(parameter).once('value').then( (row:firebase.database.DataSnapshot) => {
            if( row.val() !== null ){
                for( let i in row.val() ){
                    row.ref.child(i).remove();
                };
                message.reply(`Song removed from blacklist`)
            } else {
                message.reply(`Song not on blacklist`)
            }
        }).catch( error => {
            console.error(error);
        });

    }
}