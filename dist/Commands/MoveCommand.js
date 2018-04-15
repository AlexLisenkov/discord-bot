"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class MoveCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "move";
    }
    handle(parameter, message, connection) {
        if (connection.queue.length == 0) {
            message.reply('There is no queue').then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return null;
        }
        const indexes = parameter.split(' ');
        if (indexes.length != 2) {
            message.reply('This commands requires two parameters').then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return null;
        }
        const oldIndex = parseInt(indexes[0]) - 1;
        const newIndex = parseInt(indexes[1]) - 1;
        if (isNaN(oldIndex) || isNaN(newIndex)) {
            message.reply('This commands requires parameters to be numeric').then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return null;
        }
        connection.move(oldIndex, newIndex);
        const song = connection.queue[newIndex];
        const reply = {
            color: 0xf45342,
            title: song.snippet.title,
            url: song.url,
            description: `Repositioned form ${oldIndex + 1} to ${newIndex + 1}`,
            thumbnail: {
                "url": song.snippet.thumbnails.default.url
            },
            author: {
                'name': '↪️ Song moved',
                'url': 'https://discord.gg',
            },
            footer: {
                'text': `Moved by ${message.author.username}`
            }
        };
        connection.channel.send('', { embed: reply }).then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
    }
}
exports.default = MoveCommand;
//# sourceMappingURL=MoveCommand.js.map