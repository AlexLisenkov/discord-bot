import * as express from "express";
import * as bearerToken from "express-bearer-token";
import axios from "axios";
import VoiceConnections from "../ActiveConnection/VoiceConnections";
import SetDJCommandCommand from "../Commands/SetDJCommandCommand";
import {VoiceChannel} from "discord.js";

export default function() {
    const apiUrl = 'https://discordapp.com/api/v7';
    let app = express();
    app.set('trust proxy', 1);

    app.use(bearerToken());
    app.use( (req, res, next) => {
        const headers = {
            headers: {'Authorization': "Bearer " + req.token}
        };
        axios.get(apiUrl+'/users/@me', headers).then( (discordResponse) => {
            res.setHeader('Content-Type', 'application/json');
            res.locals.user = discordResponse.data;
            if( discordResponse.status === 200 )
                next();
        }).catch( err => {
            res.status(401);
            res.send('Unauthorized');
        });
        setTimeout(() => res.end(), 1000);
    });

    app.get('/guilds', (req, res) => {
        const headers = {
            headers: {'Authorization': "Bearer " + req.token}
        };
        axios.get(apiUrl+'/users/@me/guilds', headers).then( (discordResponse) => {
            const knownGuilds = [];
            for( let x in discordResponse.data ){
                const guild = discordResponse.data[x];
                if( VoiceConnections.getGuilds()[guild['id']] ){
                    guild.admin = VoiceConnections.getGuilds()[guild['id']].guild.members.find('id', res.locals.user.id ).hasPermission('ADMINISTRATOR');
                    knownGuilds.push(guild);
                }
            }
            res.send(JSON.stringify(knownGuilds));
        });
    });

    app.get('/me', (req, res) => {
        res.status(200);
        res.send(JSON.stringify(res.locals.user));
    });

    app.get('/guilds/:guildId', (req, res) => {
        const guild = VoiceConnections.getGuilds()[req.params.guildId];
        if( !guild ){
            res.status(404);
            res.send(JSON.stringify({
                error: true,
                message: 'Unknown guild',
            }));
        }
        if( !guild.guild.members.exists('id', res.locals.user.id ) ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User is not in guild',
            }));
        }

        res.status(200);
        res.send(JSON.stringify({
            id: guild.guild.id,
            name: guild.guild.name,
            icon: guild.guild.icon,
            ownerID: guild.guild.ownerID,
            currentSong: guild.currentSong.youtubeId,
            playing: guild.triggered,
            djRole: guild.djRole,
            prefix: guild.prefix,
        }));
    });

    app.get('/guilds/:guildId/nowPlaying', (req, res) => {
        const guild = VoiceConnections.getGuilds()[req.params.guildId];
        if( !guild ){
            res.status(404);
            res.send(JSON.stringify({
                error: true,
                message: 'Unknown guild',
            }));
        }
        if( !guild.guild.members.exists('id', res.locals.user.id ) ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User is not in guild',
            }));
        }
        res.status(200);
        if( guild.triggered && guild.currentSong != null ) {
            res.send(JSON.stringify({
                playing: guild.triggered,
                youtubeID: guild.currentSong.youtubeId,
                title: guild.currentSong.snippet.title,
                url: guild.currentSong.url,
                channelTitle: guild.currentSong.snippet.channelTitle,
                thumbnails: guild.currentSong.snippet.thumbnails,
                author: {
                    id: guild.currentSong.author.id,
                    username: guild.currentSong.author.username,
                    avatarURL: guild.currentSong.author.avatarURL,
                },
            }));
        }

        res.send(JSON.stringify({
            playing: guild.triggered,
        }));
    });

    app.get('/guilds/:guildId/queue', (req, res) => {
        const guild = VoiceConnections.getGuilds()[req.params.guildId];
        if( !guild ){
            res.status(404);
            res.send(JSON.stringify({
                error: true,
                message: 'Unknown guild',
            }));
        }
        if( !guild.guild.members.exists('id', res.locals.user.id ) ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User is not in guild',
            }));
        }
        res.status(200);
        let response = [];
        for( let x in guild.queue ) {
            response.push(
                {
                    youtubeID: guild.queue[x].youtubeId,
                    title: guild.queue[x].snippet.title,
                    url: guild.queue[x].url,
                    channelTitle: guild.queue[x].snippet.channelTitle,
                    thumbnails: guild.queue[x].snippet.thumbnails,
                    author: {
                        id: guild.queue[x].author.id,
                        username: guild.queue[x].author.username,
                        avatarURL: guild.queue[x].author.avatarURL,
                    },
                }
            );
        }
        res.send(JSON.stringify(response));
    });

    app.get('/guilds/:guildId/roles', (req, res) => {
        const guild = VoiceConnections.getGuilds()[req.params.guildId];
        if( !guild ){
            res.status(404);
            res.send(JSON.stringify({
                error: true,
                message: 'Unknown guild',
            }));
        }
        if( !guild.guild.members.exists('id', res.locals.user.id ) ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User is not in guild',
            }));
        }
        if( !guild.guild.members.find('id', res.locals.user.id ).hasPermission('ADMINISTRATOR') ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User must be an administrator',
            }));
        }
        let response = [];
        res.status(200);
        guild.guild.roles.forEach( value => {
            response.push({
                id: value.id,
                name: value.name,
                color: value.color,
                hexColor: value.hexColor,
                hoist: value.hoist,
                position: value.position,
                permissions: value.permissions,
                managed: value.managed,
                mentionable: value.mentionable,
            });
        });
        res.send(JSON.stringify(response));
    });

    app.get('/guilds/:guildId/channels', (req, res) => {
        const guild = VoiceConnections.getGuilds()[req.params.guildId];
        if( !guild ){
            res.status(404);
            res.send(JSON.stringify({
                error: true,
                message: 'Unknown guild',
            }));
        }
        if( !guild.guild.members.exists('id', res.locals.user.id ) ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User is not in guild',
            }));
        }
        if( !guild.guild.members.find('id', res.locals.user.id ).hasPermission('ADMINISTRATOR') ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User must be an administrator',
            }));
        }
        let response = [];
        res.status(200);
        guild.guild.channels.forEach( value => {
            response.push({
                id: value.id,
                name: value.name,
                type: value.type,
                position: value.position,
                parentID: value.parentID,
                muted: value.muted
            });
        });
        res.send(JSON.stringify(response));
    });

    app.get('/guilds/:guildId/config', (req, res) => {
        const guild = VoiceConnections.getGuilds()[req.params.guildId];
        if( !guild ){
            res.status(404);
            res.send(JSON.stringify({
                error: true,
                message: 'Unknown guild',
            }));
        }
        if( !guild.guild.members.exists('id', res.locals.user.id ) ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User is not in guild',
            }));
        }
        res.status(200);
        guild.database.guildConfig.data.once('value', (data) => {
            res.send(JSON.stringify(data.val()));
        });
    });

    app.get('/guilds/:guildId/djRole', (req, res) => {
        const guild = VoiceConnections.getGuilds()[req.params.guildId];
        if( !guild ){
            res.status(404);
            res.send(JSON.stringify({
                error: true,
                message: 'Unknown guild',
            }));
        }
        if( !guild.guild.members.exists('id', res.locals.user.id ) ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User is not in guild',
            }));
        }
        res.status(200);
        const role = guild.guild.roles.find('id', guild.djRole);
        res.send(JSON.stringify({
            id: role.id,
            name: role.name,
            color: role.color,
            hexColor: role.hexColor,
            hoist: role.hoist,
            position: role.position,
            permissions: role.permissions,
            managed: role.managed,
            mentionable: role.mentionable,
        }));
    });

    app.get('/guilds/:guildId/commands', (req, res) => {
        const guild = VoiceConnections.getGuilds()[req.params.guildId];
        if( !guild ){
            res.status(404);
            res.send(JSON.stringify({
                error: true,
                message: 'Unknown guild',
            }));
        }
        if( !guild.guild.members.exists('id', res.locals.user.id ) ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User is not in guild',
            }));
        }
        res.status(200);
        const response = {};
        const djCommands = guild.djCommands;
        SetDJCommandCommand.availableCommands.forEach( command => {
            response[command] = djCommands.get(command) === true;
        });
        res.send(JSON.stringify(response));
    });

    app.get('/guilds/:guildId/blacklist', (req, res) => {
        const guild = VoiceConnections.getGuilds()[req.params.guildId];
        if( !guild ){
            res.status(404);
            res.send(JSON.stringify({
                error: true,
                message: 'Unknown guild',
            }));
        }
        if( !guild.guild.members.exists('id', res.locals.user.id ) ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User is not in guild',
            }));
        }
        res.status(200);
        const response = [];
       guild.blacklist.forEach( youtubeId => {
            response.push(youtubeId);
        });
        res.send(JSON.stringify(response));
    });

    app.get('/guilds/:guildId/disallowedVoiceChannels', (req, res) => {
        const guild = VoiceConnections.getGuilds()[req.params.guildId];
        if( !guild ){
            res.status(404);
            res.send(JSON.stringify({
                error: true,
                message: 'Unknown guild',
            }));
        }
        if( !guild.guild.members.exists('id', res.locals.user.id ) ){
            res.status(401);
            res.send(JSON.stringify({
                error: true,
                message: 'User is not in guild',
            }));
        }
        res.status(200);
        const response = [];
        guild.disallowedVoiceChannels.forEach( voiceChannelId => {
            const channel = <VoiceChannel>guild.guild.channels.find('id', voiceChannelId);
            response.push({
                id: channel.id,
                name: channel.name,
                type: channel.type,
                position: channel.position,
                parentID: channel.parentID,
                muted: channel.muted,
                speakable: channel.speakable,
                full: channel.full,
                deletable: channel.deletable,
                bitrate: channel.bitrate,
            });
        });
        res.send(JSON.stringify(response));
    });

    app.listen(8080);
}