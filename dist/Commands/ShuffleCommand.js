"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class ShuffleCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "shuffle";
    }
    handle(parameter, message, connection) {
        if (!connection.triggered || connection.queue.length < 1) {
            message.reply('There\'s no queue 🙁, type in \'*' + connection.prefix + 'play [song title]*\' to start');
            return null;
        }
        connection.shuffle();
        const reply = {
            title: `🔀 Songs shuffled`,
            footer: {
                'text': `Shuffled by ${message.author.username}`
            }
        };
        connection.channel.send('', { embed: reply }).then((msg) => {
            msg.delete(30000);
        });
    }
}
exports.default = ShuffleCommand;
//# sourceMappingURL=ShuffleCommand.js.map