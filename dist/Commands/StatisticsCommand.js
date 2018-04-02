"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const discord_js_1 = require("discord.js");
const Client_1 = require("../ActiveConnection/Client");
const Config_1 = require("../Config/Config");
class StatisticsCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "statistics";
    }
    handle(parameter, message, connection) {
        const embed = new discord_js_1.RichEmbed();
        embed.setAuthor('📈 Statistics', '', 'https://pleyr.net');
        Client_1.default.statistics.data.once('value', val => {
            const global_statistics = val.val();
            embed.addField('Global', 'Server count:\nNow playing:\nPlaytime:\nSongs played:', true);
            embed.addField('\u200B', `${global_statistics.total_guilds}\n${global_statistics.total_playing}\n${this.convertSeconds(global_statistics.total_seconds)}\n${global_statistics.total_songs}`, true);
            embed.addBlankField(true);
            connection.database.statistics.data.once('value', val => {
                const guild_statistics = val.val();
                let created_at = new Date(guild_statistics.created_at).getTime() / 1000;
                if (!created_at)
                    created_at = new Date().getTime() / 1000;
                const alive_time = new Date().getTime() / 1000;
                embed.addField('Server', 'Playtime:\nSongs played:\nHere for:', true);
                embed.addField('\u200B', `${this.convertSeconds(guild_statistics.total_seconds)}\n${guild_statistics.total_songs}\n${this.convertSeconds(alive_time - created_at)}`, true);
                embed.addBlankField(true);
                if (Client_1.default.dbl) {
                    Client_1.default.dbl.hasVoted(message.author.id).then(res => {
                        if (res == false) {
                            embed.addField(`You (${message.author.username})`, 'Please [vote for us](https://pleyr.net/vote) to see your personal statistics');
                        }
                        else {
                            const personal_statistics = guild_statistics.members[message.author.id];
                            if (!personal_statistics) {
                                embed.addField(`You (${message.author.username})`, 'There are no statistics 💩');
                            }
                            else {
                                embed.addField(`You (${message.author.username})`, 'Songs listened\nOf which you queued\nTotal playtime\nOf which you queued', true);
                                embed.addField('\u200B', `${personal_statistics.total_songs_listened}\n${personal_statistics.total_songs_queued}\n${this.convertSeconds(personal_statistics.total_seconds_listened)}\n${this.convertSeconds(personal_statistics.total_seconds_queued)}`, true);
                            }
                        }
                        embed.addBlankField(true);
                        connection.channel.sendEmbed(embed);
                    });
                }
                else {
                    connection.channel.sendEmbed(embed).then(msg => {
                        msg.delete(Config_1.default.message_lifetime);
                    });
                }
            });
        });
    }
    convertSeconds(seconds) {
        if (seconds == 0)
            return "0s";
        let numyears = Math.floor(seconds / 31536000);
        let numdays = Math.floor((seconds % 31536000) / 86400);
        let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
        let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
        if (numyears != 0)
            return numyears + "y" + numdays + "d " + numhours + "h " + numminutes + "m " + Math.floor(numseconds) + "s";
        if (numyears == 0 && numdays != 0)
            return numdays + "d " + numhours + "h " + numminutes + "m " + Math.floor(numseconds) + "s";
        if (numyears == 0 && numdays == 0 && numhours != 0)
            return numhours + "h " + numminutes + "m " + Math.floor(numseconds) + "s";
        if (numyears == 0 && numdays == 0 && numhours == 0 && numminutes != 0)
            return numminutes + "m " + Math.floor(numseconds) + "s";
    }
}
exports.default = StatisticsCommand;
//# sourceMappingURL=StatisticsCommand.js.map