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
                const embed = {
                    "description": "What would you like to do?\n\n✅ Queue up the playlist\n🔀 Shuffle and queue up the playlist\n🛑 To ignore",
                    "url": "https://pleyr.net",
                    "footer": {
                        "text": `Authored by ${message.author.username}`
                    },
                    "author": {
                        "name": "📋Playlist found",
                        "url": "https://pleyr.net"
                    }
                };
                connection.channel.send('', { embed: embed })
                    .then((msg) => {
                    let hasReacted = false;
                    msg.react('✅').then(() => {
                        msg.react('🔀').then(() => {
                            msg.react('🛑');
                        });
                    });
                    const ingoreFilter = (reaction, user) => ((!user.bot &&
                        reaction.emoji.name == '🛑' &&
                        !hasReacted) &&
                        (user.id == message.author.id ||
                            user.permissions.has('ADMINISTRATOR') ||
                            user.roles.exists('id', connection.djRole)));
                    const removeMessageReaction = msg.createReactionCollector(ingoreFilter);
                    removeMessageReaction.on('collect', (reaction) => {
                        hasReacted = true;
                        msg.delete();
                    });
                    const filter = (reaction, user) => ((!user.bot &&
                        !hasReacted &&
                        (reaction.emoji.name == '✅' ||
                            reaction.emoji.name == '🔀')) &&
                        (user.id == message.author.id ||
                            user.permissions.has('ADMINISTRATOR') ||
                            user.roles.exists('id', connection.djRole)));
                    const reactionCollector = msg.createReactionCollector(filter);
                    reactionCollector.on('collect', (reaction) => {
                        hasReacted = true;
                        connection.channel.send(`Loaded ${result.length} songs from playlist`).then((msg) => {
                            msg.delete(Config_1.default.message_lifetime);
                        });
                        if (reaction.emoji.name == '🔀') {
                            result = connection.arrayShuffle(result);
                        }
                        for (let i = 0; i < result.length; i++) {
                            result[i].author = message.author;
                            connection.pushToQueue(result[i], false);
                        }
                    });
                    msg.delete(Config_1.default.message_lifetime);
                });
            }
        }).catch((error) => {
            message.reply(error);
        });
    }
}
exports.default = PlayCommand;
//# sourceMappingURL=PlayCommand.js.map