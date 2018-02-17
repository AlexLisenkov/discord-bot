"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const ytdl = require("ytdl-core");
const url = require("url");
class AddToBlacklistCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "blacklist add";
        this.adminOnly = true;
    }
    handle(parameter, message, connection) {
        if (!ytdl.validateLink(parameter)) {
            message.reply(`${parameter} is not a valid YouTube url`);
            return null;
        }
        const videoID = url.parse(parameter, true).query.v;
        connection.database.blacklist.data.orderByValue().equalTo(videoID).once('value').then((row) => {
            if (row.val() !== null) {
                message.reply(`Song already on blacklist`);
            }
            else {
                connection.database.blacklist.data.push(videoID);
                message.reply(`Song blacklisted`);
            }
        });
    }
}
exports.default = AddToBlacklistCommand;
//# sourceMappingURL=AddToBlacklistCommand.js.map