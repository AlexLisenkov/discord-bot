"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class RemoveCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "remove";
    }
    handle(parameter, message, connection) {
        const index = parseInt(parameter) - 1;
        const song = connection.queue[index];
        connection.removeIndex(index);
        const reply = {
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
        connection.channel.send('', { embed: reply }).then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
        ;
    }
}
exports.default = RemoveCommand;
//# sourceMappingURL=RemoveCommand.js.map