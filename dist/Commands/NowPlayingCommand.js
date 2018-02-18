"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class NowPlayingCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "np";
    }
    handle(parameter, message, connection) {
        if (!connection.currentSong) {
            message.reply('`I\'m not playing anything`').then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            ;
            return null;
        }
        const song = connection.currentSong;
        const embed = {
            title: song.snippet.title,
            url: song.url,
            description: song.snippet.channelTitle,
            thumbnail: {
                "url": song.snippet.thumbnails.default.url
            },
            author: {
                'name': '🎶 Now playing',
                'url': 'https://discord.gg',
            },
            footer: {
                'text': `Added by ${song.author.username}`
            }
        };
        connection.channel.send('', { embed: embed }).then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
    }
}
exports.default = NowPlayingCommand;
//# sourceMappingURL=NowPlayingCommand.js.map