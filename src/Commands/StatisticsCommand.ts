import Command from "./Command";
import {Message, RichEmbed} from "discord.js";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import Client from "../ActiveConnection/Client";
import Config from "../Config/Config";

export default class StatisticsCommand extends Command
{
    command: string = "statistics";

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        const embed = new RichEmbed();
        embed.setAuthor('📈 Statistics','', 'https://pleyr.net');

        Client.statistics.data.once('value', val => {
            const global_statistics = val.val();
            embed.addField('Global', 'Server count:\nNow playing:\nPlaytime:\nSongs played:', true);
            embed.addField('\u200B', `${global_statistics.total_guilds}\n${global_statistics.total_playing}\n${this.convertSeconds(global_statistics.total_seconds)}\n${global_statistics.total_songs}`, true);
            embed.addBlankField(true);
            connection.database.statistics.data.once('value', val => {
                const guild_statistics = val.val();
                let created_at = new Date(guild_statistics.created_at).getTime() / 1000;
                if( !created_at )
                    created_at = new Date().getTime() / 1000;
                const alive_time = new Date().getTime() / 1000;
                embed.addField('Server', 'Playtime:\nSongs played:\nHere for:', true);
                embed.addField('\u200B', `${this.convertSeconds(guild_statistics.total_seconds)}\n${guild_statistics.total_songs}\n${this.convertSeconds(alive_time-created_at)}`, true)
                embed.addBlankField(true);
                if( Client.dbl ){
                    Client.dbl.hasVoted(message.author.id).then( res => {
                        if( res == false ){
                            embed.addField(`You (${message.author.username})`, 'Please [vote for us](https://pleyr.net/vote) to see your personal statistics');
                        } else {
                            const personal_statistics = guild_statistics.members[message.author.id];
                            if( !personal_statistics ){
                                embed.addField(`You (${message.author.username})`, 'There are no statistics 💩');
                            } else {
                                embed.addField(`You (${message.author.username})`, 'Songs listened\nOf which you queued\nTotal playtime\nOf which you queued', true);
                                embed.addField('\u200B', `${personal_statistics.total_songs_listened}\n${personal_statistics.total_songs_queued}\n${this.convertSeconds(personal_statistics.total_seconds_listened)}\n${this.convertSeconds(personal_statistics.total_seconds_queued)}`, true)
                            }
                        }
                        embed.addBlankField(true);
                        connection.channel.sendEmbed(embed);
                    });
                } else {
                    connection.channel.sendEmbed(embed).then( msg => {
                        msg.delete(Config.message_lifetime);
                    } );
                }
            });
        });
    }

    public convertSeconds( seconds:number ):string {
        if( seconds == 0 )
            return "0s";
        let numyears = Math.floor(seconds / 31536000);
        let numdays = Math.floor((seconds % 31536000) / 86400);
        let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
        let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
        if( numyears != 0 )
            return numyears+ "y" + numdays + "d " + numhours + "h " + numminutes + "m " + Math.floor(numseconds) + "s";
        if( numyears == 0 && numdays != 0 )
            return numdays + "d " + numhours + "h " + numminutes + "m " + Math.floor(numseconds) + "s";
        if( numyears == 0 && numdays == 0 && numhours != 0 )
            return numhours + "h " + numminutes + "m " + Math.floor(numseconds) + "s";
        if( numyears == 0 && numdays == 0 && numhours == 0 && numminutes != 0)
            return numminutes + "m " + Math.floor(numseconds) + "s";
    }
}