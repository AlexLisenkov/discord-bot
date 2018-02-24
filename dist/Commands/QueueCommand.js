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
        });
    }
}
exports.default = QueueCommand;
//# sourceMappingURL=QueueCommand.js.map