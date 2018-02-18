"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const YouTube_1 = require("../YouTube/YouTube");
const Song_1 = require("../YouTube/Song");
const Config_1 = require("../Config/Config");
class PlayCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "play";
        this.requiresVoiceChannel = true;
    }
    handle(parameter, message, connection) {
        YouTube_1.default.search(parameter).then((result) => {
            if (result instanceof Song_1.default) {
                result.author = message.author;
                connection.pushToQueue(result);
            }
            else {
                connection.channel.send(`Loaded ${result.length} songs from playlist`).then((msg) => {
                    msg.delete(Config_1.default.message_lifetime);
                });
                for (let i = 0; i < result.length; i++) {
                    result[i].author = message.author;
                    connection.pushToQueue(result[i], false);
                }
            }
        }).catch((error) => {
            message.reply(error);
        });
    }
}
exports.default = PlayCommand;
//# sourceMappingURL=PlayCommand.js.map