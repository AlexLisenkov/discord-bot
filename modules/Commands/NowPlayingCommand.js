const Command = require('./Command');

class NowPlayingCommand extends Command
{
    command() {
        return "np";
    }

    handle(parameter, message, connection) {

        if( !connection.currentSong )
            return message.reply('`I\'m not playing anything`');

        const song = connection.currentSong;
        const embed =
            {
                title: song.snippet.title,
                url: song.url,
                description: song.snippet.channelTitle,
                thumbnail: {
                    "url": song.snippet.thumbnails.default.url
                },
                author: {
                    'name': '🎶 Now playing',
                    'url': 'https://discord.gg',
                },
                footer: {
                    'text': `Added by ${song.author.username}`
                }
            };
        return connection.channel.send('', {embed: embed})
    }
}

module.exports = NowPlayingCommand;