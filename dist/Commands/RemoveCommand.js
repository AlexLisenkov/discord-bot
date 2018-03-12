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
        const range = parameter.split('-');
        if (message.mentions.members.size)
            return this.removeByMember(message.mentions.members.first(), message, connection);
        if (range.length == 2)
            return this.removeByRange(parseInt(range[0]), parseInt(range[1]), message, connection);
        else if (range.length == 1)
            return this.removeByIndex(parseInt(range[0]), message, connection);
        return null;
    }
    removeByIndex(index, message, connection) {
        if (isNaN(index) || index > connection.queue.length) {
            message.reply('Index does not exist').then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return null;
        }
        const song = connection.queue[index - 1];
        connection.removeIndex(index - 1);
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
    }
    removeByRange(start, end, message, connection) {
        if (start > connection.queue.length || isNaN(start) || isNaN(end)) {
            message.reply('Index does not exist').then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return null;
        }
        connection.queue.splice(start - 1, end - start + 1);
        const reply = {
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
        connection.channel.send('', { embed: reply }).then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
    }
    removeByMember(member, message, connection) {
        let count = 0;
        for (let i = connection.queue.length - 1; i >= 0; i--) {
            const value = connection.queue[i];
            if (value.author.id == member.id) {
                connection.removeIndex(i);
                count++;
            }
        }
        const reply = {
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
        connection.channel.send('', { embed: reply }).then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
    }
}
exports.default = RemoveCommand;
//# sourceMappingURL=RemoveCommand.js.map