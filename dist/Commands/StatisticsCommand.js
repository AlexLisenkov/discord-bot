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
            embed.addField('🌍 Global', 'Server count:\nPlaytime:\nSongs played:', true);
            embed.addField('_ ', `${global_statistics.total_guilds}\n${this.convertSeconds(global_statistics.total_seconds)}\n${global_statistics.total_songs}`, true);
            embed.addBlankField(true);
            connection.database.statistics.data.once('value', val => {
                const guild_statistics = val.val();
                embed.addField('📌 Server', 'Playtime:\nSongs played:\n', true);
                embed.addField('_ ', `${this.convertSeconds(guild_statistics.total_seconds)}\n${guild_statistics.total_songs}`, true);
                embed.addBlankField(true);
                if (Client_1.default.dbl) {
                    Client_1.default.dbl.hasVoted(message.author.id).then(res => {
                        if (res == false) {
                            embed.addField(`🙍 You (${message.author.username})`, 'Please [vote for us](https://pleyr.net/vote) to see your personal statistics');
                        }
                        else {
                            const personal_statistics = guild_statistics.members[message.author.id];
                            if (!personal_statistics) {
                                embed.addField(`🙍 You (${message.author.username})`, 'There are no statistics 💩');
                            }
                            else {
                                embed.addField(`🙍 You (${message.author.username})`, 'Songs listened\nOf which you queued\nTotal playtime\nOf which you queued', true);
                                embed.addField('_ ', `${personal_statistics.total_songs_listened}\n${personal_statistics.total_songs_queued}\n${this.convertSeconds(personal_statistics.total_seconds_listened)}\n${this.convertSeconds(personal_statistics.total_seconds_queued)}`, true);
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
        const days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        const hrs = Math.floor(seconds / 3600);
        seconds -= hrs * 3600;
        const mnts = Math.floor(seconds / 60);
        seconds -= mnts * 60;
        let string = '';
        if (days != 0)
            string += days + "d ";
        if (hrs != 0 && days == 0)
            string += hrs + "h ";
        return (string + mnts + "m " + Math.ceil(seconds) + "s");
    }
}
exports.default = StatisticsCommand;
//# sourceMappingURL=StatisticsCommand.js.map