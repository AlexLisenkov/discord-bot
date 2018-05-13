import Command from "./Command";
import {Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Config from "../Config/Config";

export default class AdminHelpCommand extends Command
{
    command: string = "adminhelp";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        const prefix = connection.prefix;

        const reply =
            {
                color: 0xA2E13D,
                author: {
                    'name': 'ℹ️ Available admin commands',
                    'url': 'https://pleyr.net',
                },
                description: `
**${prefix}prefix [character]** *The the prefix character (or string, admin-only)*
**${prefix}blacklist show** *Lists blacklisted YouTube ids*
**${prefix}voicechannel show** *Lists blocked voice channels for the bot*
**${prefix}blacklist add [YouTube-url]** *Adds a YouTube video to the blacklist (admin-only)*
**${prefix}blacklist remove [YouTube-id]** *Removes a YouTube video from the blacklist (admin-only)*
**${prefix}dj role [role name]** *Sets the DJ role (admin-only)*
**${prefix}dj require [command]** *Set a command to DJ-only (help command is always public) (admin-only)*
**${prefix}dj remove [command]** *Remove DJ-only from a command (admin-only)*
**${prefix}conf silent [0|1]** *Enable/disable silent mode*
`
            };
        connection.channel.send('', {embed: reply}).then( (msg: Message) => {
            msg.delete(60000);
        });;
    }
}