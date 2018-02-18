"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const ytdl = require("ytdl-core");
const url = require("url");
const Config_1 = require("../Config/Config");
class AddToBlacklistCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "blacklist add";
        this.adminOnly = true;
    }
    handle(parameter, message, connection) {
        if (!ytdl.validateLink(parameter)) {
            message.reply(`${parameter} is not a valid YouTube url`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            ;
            return null;
        }
        const videoID = url.parse(parameter, true).query.v;
        connection.database.blacklist.data.orderByValue().equalTo(videoID).once('value').then((row) => {
            if (row.val() !== null) {
                message.reply(`Song already on blacklist`).then((msg) => {
                    msg.delete(Config_1.default.message_lifetime);
                });
                ;
            }
            else {
                connection.database.blacklist.data.push(videoID);
                message.reply(`Song blacklisted`).then((msg) => {
                    msg.delete(Config_1.default.message_lifetime);
                });
                ;
            }
        });
    }
}
exports.default = AddToBlacklistCommand;
//# sourceMappingURL=AddToBlacklistCommand.js.map