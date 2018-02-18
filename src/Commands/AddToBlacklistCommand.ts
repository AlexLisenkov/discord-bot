import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import * as ytdl from 'ytdl-core';
import * as url from "url";
import Config from "../Config/Config";

export default class AddToBlacklistCommand extends Command
{
    command: string = "blacklist add";
    adminOnly: boolean = true;

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        if( !ytdl.validateLink(parameter) ){
            message.reply(`${parameter} is not a valid YouTube url`).then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });;
            return null;
        }

        const videoID = <string>url.parse(parameter, true).query.v;
        connection.database.blacklist.data.orderByValue().equalTo(videoID).once('value').then( (row: firebase.database.DataSnapshot) => {
            if (row.val() !== null) {
                message.reply(`Song already on blacklist`).then( (msg: Message) => {
                    msg.delete(Config.message_lifetime);
                });;
            } else {
                connection.database.blacklist.data.push(videoID);
                message.reply(`Song blacklisted`).then( (msg: Message) => {
                    msg.delete(Config.message_lifetime);
                });;
            }
        });
    }
}