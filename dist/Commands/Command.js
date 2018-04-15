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
            const connect = VoiceConnections_1.default.getOrCreate(message.guild);
            this.message = message;
            connect.then((connection) => {
                if (!message.content.startsWith(`${connection.prefix}${this.command}`) &&
                    !(message.content.startsWith(`${Config_1.default.prefix}help`) && this.command == 'help'))
                    return;
                connection.channel = message.channel;
                this.connection = connection;
                if (message.member.hasPermission('ADMINISTRATOR'))
                    return this.prepareHandle(message, connection);
                if (!this.requiresDJRole(connection) && !this.adminOnly)
                    return this.prepareHandle(message, connection);
                if (this.requiresDJRole(connection) && message.member.roles.exists('id', connection.djRole))
                    return this.prepareHandle(message, connection);
                if (!this.requiresDJRole(connection) && this.adminOnly)
                    message.reply(`This command is for administrators only`).then((msg) => {
                        msg.delete(Config_1.default.message_lifetime);
                    });
                else
                    message.reply(`You need the DJ role to do this`).then((msg) => {
                        msg.delete(Config_1.default.message_lifetime);
                    });
            }).catch(err => {
                message.reply(err);
            });
        });
    }
    prepareHandle(message, connection) {
        if (!this.requiresVoiceChannel || (this.requiresVoiceChannel && connection.voiceChannel !== undefined)) {
            this.handle(message.content.replace(connection.prefix + this.command, '').trim(), message, connection);
            return null;
        }
        if (Command.setVoiceChannel(message, connection))
            this.handle(message.content.replace(connection.prefix + this.command, '').trim(), message, connection);
    }
    requiresDJRole(connection) {
        return (connection.djCommands[this.command] !== undefined && connection.djCommands[this.command] === true);
    }
    static setVoiceChannel(message, connection, checkIfJoined = true) {
        if (checkIfJoined && connection.voiceChannel !== undefined)
            return true;
        if (message.member.voiceChannel === undefined) {
            message.reply('You must be in a voice channel to summon me')
                .then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return false;
        }
        if (!message.member.voiceChannel.joinable) {
            message.reply('I am not allowed to join this channel')
                .then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return false;
        }
        if (!message.member.voiceChannel.speakable) {
            message.reply('I am not able to play songs in this channel')
                .then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return false;
        }
        const match = connection.disallowedVoiceChannels.find(el => {
            return el == message.member.voiceChannel.id;
        });
        if (match != null) {
            message.reply(`I am not allowed to join this channel`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return false;
        }
        else {
            connection.voiceChannel = message.member.voiceChannel;
            connection.voiceChannel.join();
            connection.setDisconnectTimer();
            return true;
        }
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map