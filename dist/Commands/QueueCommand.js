"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class QueueCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "queue";
    }
    handle(parameter, message, connection) {
        if (!connection.triggered || connection.queue.length < 1) {
            message.reply('There\'s no queue 🙁, type in \'*' + Config_1.default.prefix + 'play [song title]*\' to start');
            return null;
        }
        const reply = {
            color: 0xA2E13D,
            author: {
                'name': '🔻 Playlist',
                'url': 'https://discord.gg',
            },
            description: ''
        };
        for (let i = 0; i < connection.queue.length; i++) {
            reply.description += `**[${i + 1}]**: ${connection.queue[i].snippet.title}\n`;
            if (i >= 19) {
                reply.description += `\n Showing ${i + 1} of ${connection.queue.length} total`;
                break;
            }
        }
        connection.channel.send('', { embed: reply }).then((msg) => {
            msg.delete(30000);
        });
    }
}
exports.default = QueueCommand;
//# sourceMappingURL=QueueCommand.js.map