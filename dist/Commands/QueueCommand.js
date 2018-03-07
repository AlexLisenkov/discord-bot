"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class QueueCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "queue";
    }
    handle(parameter, message, connection) {
        if (!connection.triggered || connection.queue.length < 1) {
            message.reply('There\'s no queue 🙁, type in \'*' + connection.prefix + 'play [song title]*\' to start');
            return null;
        }
        const perPage = 20;
        const totalPages = Math.ceil(connection.queue.length / perPage);
        let page = parseInt(parameter);
        if (isNaN(page) || page <= 0 || page > totalPages)
            page = 1;
        const reply = {
            color: 0xA2E13D,
            author: {
                'name': '🔻 Playlist',
                'url': 'https://discord.gg',
            },
            description: '',
            footer: {
                'text': `Showing page ${page} of ${totalPages}\t(${connection.prefix}queue [page] to see other pages)`
            }
        };
        for (let i = perPage * (page - 1); i < perPage * page; i++) {
            if (i + 1 > connection.queue.length)
                break;
            reply.description += `**[${i + 1}]**: ${connection.queue[i].snippet.title}\n`;
        }
        connection.channel.send('', { embed: reply }).then((msg) => {
            msg.delete(30000);
            if (totalPages == 1)
                return;
            this.firstPage(page, totalPages, msg, message, connection).then(() => {
                this.prevPage(page, totalPages, msg, message, connection).then(() => {
                    this.nextPage(page, totalPages, msg, message, connection).then(() => {
                        this.lastPage(page, totalPages, msg, message, connection);
                    });
                });
            });
        });
    }
    firstPage(page, totalPages, msg, message, connection) {
        const first_page_filter = (reaction, user) => ((!user.bot &&
            reaction.emoji.name == '⏮'));
        msg.createReactionCollector(first_page_filter).on('collect', () => {
            msg.delete(0);
            this.handle('1', message, connection);
        });
        return msg.react('⏮');
    }
    prevPage(page, totalPages, msg, message, connection) {
        const previous_filter = (reaction, user) => ((!user.bot &&
            reaction.emoji.name == '⬅'));
        msg.createReactionCollector(previous_filter).on('collect', () => {
            msg.delete(0);
            this.handle(`${page - 1}`, message, connection);
        });
        return msg.react('⬅');
    }
    nextPage(page, totalPages, msg, message, connection) {
        const next_filter = (reaction, user) => ((!user.bot &&
            reaction.emoji.name == '➡'));
        msg.createReactionCollector(next_filter).on('collect', () => {
            msg.delete(0);
            this.handle(`${page + 1}`, message, connection);
        });
        return msg.react('➡');
    }
    lastPage(page, totalPages, msg, message, connection) {
        const last_page_filter = (reaction, user) => ((!user.bot &&
            reaction.emoji.name == '⏭'));
        msg.createReactionCollector(last_page_filter).on('collect', () => {
            msg.delete(0);
            this.handle(`${totalPages}`, message, connection);
        });
        return msg.react('⏭');
    }
}
exports.default = QueueCommand;
//# sourceMappingURL=QueueCommand.js.map