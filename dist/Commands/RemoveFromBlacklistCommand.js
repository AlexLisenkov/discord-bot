"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class RemoveFromBlacklistCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "blacklist remove";
        this.adminOnly = true;
    }
    handle(parameter, message, connection) {
        connection.database.blacklist.data.orderByValue().equalTo(parameter).once('value').then((row) => {
            if (row.val() !== null) {
                for (let i in row.val()) {
                    row.ref.child(i).remove();
                }
                ;
                message.reply(`Song removed from blacklist`).then((msg) => {
                    msg.delete(Config_1.default.message_lifetime);
                });
            }
            else {
                message.reply(`Song not on blacklist`).then((msg) => {
                    msg.delete(Config_1.default.message_lifetime);
                });
            }
        }).catch(error => {
            console.error(error);
        });
    }
}
exports.default = RemoveFromBlacklistCommand;
//# sourceMappingURL=RemoveFromBlacklistCommand.js.map