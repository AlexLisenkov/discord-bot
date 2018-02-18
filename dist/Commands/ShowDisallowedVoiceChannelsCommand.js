"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class ShowDisallowedVoiceChannelsCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.command = "voicechannel show";
    }
    handle(parameter, message, connection) {
        const voiceChannels = message.guild.channels;
        let reply = {
            color: 0xA2E13D,
            author: {
                'name': 'Blocked voice channels',
                'url': 'https://discord.gg',
            },
            description: ''
        };
        connection.database.disallowedVoiceChannels.data.once('value').then((row) => {
            for (let x in row.val()) {
                const name = voiceChannels.find('id', row.val()[x]).name;
                reply.description += `\n- ${name}`;
            }
            connection.channel.send('', { embed: reply }).then((msg) => {
                msg.delete(60000);
            });
        });
    }
}
exports.default = ShowDisallowedVoiceChannelsCommand;
//# sourceMappingURL=ShowDisallowedVoiceChannelsCommand.js.map