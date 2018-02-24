"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const YouTube_1 = require("../YouTube/YouTube");
const Song_1 = require("../YouTube/Song");
const Config_1 = require("../Config/Config");
class ForcePlayCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "forceplay";
        this.requiresVoiceChannel = true;
    }
    handle(parameter, message, connection) {
        YouTube_1.default.search(parameter).then((result) => {
            if (result instanceof Song_1.default) {
                result.author = message.author;
                connection.queue.unshift(result);
                connection.skip();
            }
            else {
                connection.channel.send(`I cannot force play a playlist`).then((msg) => {
                    msg.delete(Config_1.default.message_lifetime);
                });
            }
        }).catch((error) => {
            message.reply(error);
        });
    }
}
exports.default = ForcePlayCommand;
//# sourceMappingURL=ForcePlayCommand.js.map