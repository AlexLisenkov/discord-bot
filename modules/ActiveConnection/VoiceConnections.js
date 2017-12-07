const VoiceConnection = require('./VoiceConnection');

let guilds = {};

class VoiceConnections
{
    static getOrCreate(message) {
        return new Promise( (then, err) => {
            const guildId = message.guild.id;
            if( !(guildId in guilds) ){
                if( message.member.voiceChannel === undefined )
                    err('You got to be in a voice channel to summon me');

                guilds[guildId] = new VoiceConnection(message.member.voiceChannel, message.channel);
            }
            then( guilds[guildId]);
        } );
    }

    static remove( guildId ){
        if( guildId in guilds )
            delete guilds[guildId];
    }
}

module.exports = VoiceConnections;