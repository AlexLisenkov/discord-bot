"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Config_1 = require("../Config/Config");
class RemoveDisallowVoiceChannelsCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "voicechannel allow";
        this.adminOnly = true;
    }
    handle(parameter, message, connection) {
        if (parameter == '') {
            message.reply('Missing required parameter `channel name`').then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return null;
        }
        const voiceChannels = message.guild.channels.findAll('type', 'voice');
        let channel = null;
        for (let x in voiceChannels) {
            if (parameter.toLowerCase() == voiceChannels[x].name.toLowerCase())
                channel = voiceChannels[x];
        }
        if (!channel) {
            message.reply(`Could not find a voice channel named '${parameter}'`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return null;
        }
        connection.database.disallowedVoiceChannels.data.orderByValue().equalTo(channel.id).once('value').then((row) => {
            if (row.val() !== null) {
                for (let i in row.val()) {
                    row.ref.child(i).remove();
                }
                ;
                message.reply(`Channel removed from blacklist`).then((msg) => {
                    msg.delete(Config_1.default.message_lifetime);
                });
            }
            else {
                message.reply(`Channel '${parameter}' not blocked`).then((msg) => {
                    msg.delete(Config_1.default.message_lifetime);
                });
            }
        });
    }
}
exports.default = RemoveDisallowVoiceChannelsCommand;
//# sourceMappingURL=RemoveDisallowVoiceChannelsCommand.js.map