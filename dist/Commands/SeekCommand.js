"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class SeekCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "seek";
    }
    handle(parameter, message, connection) {
        connection.seekCurrentSong(parameter);
    }
}
exports.default = SeekCommand;
//# sourceMappingURL=SeekCommand.js.map