"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class ShowBlacklistCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "blacklist show";
    }
    handle(parameter, message, connection) {
        let reply = {
            color: 0xA2E13D,
            author: {
                'name': 'Blacklist',
                'url': 'https://discord.gg',
            },
            description: ''
        };
        connection.database.blacklist.data.once('value').then((row) => {
            for (let x in row.val())
                reply.description += `\n- [${row.val()[x]}](https://youtube.com/watch?v=${row.val()[x]})`;
            connection.channel.send('', { embed: reply }).then((msg) => {
                msg.delete(60000);
            });
        });
    }
}
exports.default = ShowBlacklistCommand;
//# sourceMappingURL=ShowBlacklistCommand.js.map