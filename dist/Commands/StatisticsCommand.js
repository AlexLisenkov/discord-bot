"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class PlayCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "play";
        this.requiresVoiceChannel = true;
    }
    handle(parameter, message, connection) {
        const embed = {
            "description": "What would you like to do?\n\n✅ Queue up the playlist\n🔀 Shuffle and queue up the playlist\n🛑 To ignrore",
            "url": "https://pleyr.net",
            "footer": {
                "text": `Requested by ${message.author.username}`
            },
            "author": {
                "name": "📋Playlist found",
                "url": "https://pleyr.net"
            }
        };
    }
}
exports.default = PlayCommand;
//# sourceMappingURL=StatisticsCommand.js.map