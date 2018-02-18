"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../ActiveConnection/Client");
const VoiceConnections_1 = require("../ActiveConnection/VoiceConnections");
const Config_1 = require("../Config/Config");
class Command {
    constructor() {
        this.adminOnly = false;
        this.requiresVoiceChannel = false;
        Client_1.default.instance.on("message", (message) => {
            if (message.author.bot)
                return;
            if (message.content.startsWith(Config_1.default.prefix + this.command)) {
                if (this.adminOnly && !message.member.hasPermission('ADMINISTRATOR')) {
                    message.reply('You do not have the correct permission to run this command').then((msg) => {
                        msg.delete(Config_1.default.message_lifetime);
                    });
                    return;
                }
                const connect = VoiceConnections_1.default.getOrCreate(message);
                connect.then((connection) => {
                    if (!this.requiresVoiceChannel || (this.requiresVoiceChannel && connection.voiceChannel !== undefined)) {
                        this.handle(message.content.replace(Config_1.default.prefix + this.command, '').trim(), message, connection);
                        return true;
                    }
                    Command.setVoiceChannel(message, connection).then((res) => {
                        if (res)
                            this.handle(message.content.replace(Config_1.default.prefix + this.command, '').trim(), message, connection);
                    });
                }).catch(err => {
                    message.reply(err);
                });
            }
        });
    }
    static setVoiceChannel(message, connection) {
        if (connection.voiceChannel !== undefined)
            return new Promise((then) => {
                return then(true);
            });
        if (message.member.voiceChannel === undefined) {
            message.reply('You must be in a voice channel to summon me')
                .then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return new Promise((then) => {
                return then(false);
            });
        }
        if (!message.member.voiceChannel.joinable) {
            message.reply('I am not allowed to join this channel')
                .then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return new Promise((then) => {
                return then(false);
            });
        }
        if (!message.member.voiceChannel.speakable) {
            message.reply('I am not able to play songs in this channel')
                .then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return new Promise((then) => {
                return then(false);
            });
        }
        return connection.database.disallowedVoiceChannels.data.orderByValue().equalTo(message.member.voiceChannel.id).once('value').then((row) => {
            if (row.val() !== null) {
                message.reply(`I am not allowed to join this channel`).then((msg) => {
                    msg.delete(Config_1.default.message_lifetime);
                });
                return false;
            }
            else {
                connection.voiceChannel = message.member.voiceChannel;
                connection.voiceChannel.join();
                return true;
            }
        });
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map