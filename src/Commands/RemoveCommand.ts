import Command from "./Command";
import {GuildMember, Message} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Config from "../Config/Config";

export default class RemoveCommand extends Command
{
    command: string = "remove";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        const range = parameter.split('-');
        if( message.mentions.members.size )
            return this.removeByMember(message.mentions.members.first(), message, connection);
        if( range.length == 2 )
            return this.removeByRange(parseInt(range[0]), parseInt(range[1]), message, connection);
        else if( range.length == 1 )
            return this.removeByIndex(parseInt(range[0]), message, connection);
        return null;
    }

    public removeByIndex( index:number, message: Message, connection: VoiceConnection ):void {
        if( isNaN(index) || index > connection.queue.length){
            message.reply('Index does not exist').then((msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }
        const song = connection.queue[index-1];
        connection.removeIndex(index-1);

        const reply =
            {
                color: 0xf45342,
                title: song.snippet.title,
                url: song.url,
                description: song.snippet.channelTitle,
                thumbnail: {
                    "url": song.snippet.thumbnails.default.url
                },
                author: {
                    'name': '❌ Song removed from queue',
                    'url': 'https://discord.gg',
                },
                footer: {
                    'text': `Removed by ${message.author.username}`
                }
            };

        connection.channel.send('', {embed: reply}).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });
    }

    public removeByRange( start:number, end:number, message: Message, connection: VoiceConnection ): void{
        if( start > connection.queue.length || isNaN(start) || isNaN(end)) {
            message.reply('Index does not exist').then((msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return null;
        }
        connection.queue.splice(start-1, end-start+1);

        const reply =
            {
                color: 0xf45342,
                title: `Indexes ${start} to ${end}`,
                author: {
                    'name': '❌ Songs removed from queue',
                    'url': 'https://discord.gg',
                },
                footer: {
                    'text': `Removed by ${message.author.username}`
                }
            };

        connection.channel.send('', {embed: reply}).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });
    }

    public removeByMember( member:GuildMember, message: Message, connection: VoiceConnection ):void {
        let count = 0;
        for ( let i = connection.queue.length-1; i >= 0; i--){
            const value = connection.queue[i];
            if( value.author.id == member.id ) {
                connection.removeIndex(i);
                count++;
            }
        }

        const reply =
            {
                color: 0xf45342,
                title: `Removed ${count} songs that were added by ${member.displayName}`,
                author: {
                    'name': `❌ ${count} songs removed from queue`,
                    'url': 'https://discord.gg',
                },
                footer: {
                    'text': `Removed by ${message.author.username}`
                }
            };

        connection.channel.send('', {embed: reply}).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });
    }
}