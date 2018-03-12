import Command from "./Command";
import YouTube from "../YouTube/YouTube";
import Song from "../YouTube/Song";
import VoiceConnection from "../ActiveConnection/VoiceConnection";
import {Message} from "discord.js";
import Config from "../Config/Config";

export default class PlayCommand extends Command
{
    command: string = "play";
    requiresVoiceChannel: boolean = true;

    handle(parameter: string, message: Message, connection: VoiceConnection): void {
        YouTube.search(parameter).then((result:any) => {
            if( result instanceof Song ){
                result.author = message.author;
                connection.pushToQueue(result);
            } else {
                const embed =
                    {
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
                connection.channel.send('', {embed: embed})
                .then( (msg: Message) => {
                    let hasReacted = false;
                    msg.react('✅').then( () => {
                        msg.react('🔀').then( () => {
                            msg.react('🛑');
                        });
                    });
                    const ingoreFilter = (reaction, user) => (
                        (
                            !user.bot &&
                            reaction.emoji.name == '🛑' &&
                            !hasReacted
                        ) &&
                        (
                            user.id == message.author.id ||
                            user.permissions.has('ADMINISTRATOR') ||
                            user.roles.exists('id', connection.djRole)
                        )
                    );
                    const removeMessageReaction = msg.createReactionCollector(ingoreFilter);

                    removeMessageReaction.on('collect', (reaction) => {
                        hasReacted = true;
                        msg.delete();
                    });

                    const filter = (reaction, user) => (
                        (
                            !user.bot &&
                            !hasReacted &&
                            (reaction.emoji.name == '✅' ||
                            reaction.emoji.name == '🔀' )
                        ) &&
                        (
                            user.id == message.author.id ||
                            user.permissions.has('ADMINISTRATOR') ||
                            user.roles.exists('id', connection.djRole)
                        )
                    );
                    const reactionCollector = msg.createReactionCollector(filter);

                    reactionCollector.on('collect', (reaction) => {
                        hasReacted = true;
                        connection.channel.send(`Loaded ${result.length} songs from playlist`).then((msg: Message) => {
                            msg.delete(Config.message_lifetime);
                        });
                        if( reaction.emoji.name == '🔀' ){
                            result = connection.arrayShuffle(result);
                        }
                        for (let i = 0; i < result.length; i++) {
                            result[i].author = message.author;
                            connection.pushToQueue(result[i], false);
                        }
                    });
                    msg.delete(Config.message_lifetime);
                });
            }
        }).catch((error) => {
            message.reply(error);
        });
    }
}