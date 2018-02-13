const Command = require('./Command');

class SetVolumeCommand extends Command
{
    command() {
        return "volume";
    }

    handle(parameter, message, connection) {
        parameter = parameter / 100;
        connection.setVolume(parameter);

        let reply = '```markdown';

        parameter = parameter * 10;

        if( parameter > 10 )
            parameter = 10;
        else if ( parameter < 0 )
            parameter = 0;

        let progress = '';
        for( let i = 0; i < parameter*2; i++ )
            progress += '█';

        for( let i = 0; i < 20-(parameter*2); i++ )
            progress += ' ';

        let emoji = '';

        if( parameter >= 5 )
            emoji = '🔊';
        else if( parameter > 2 )
            emoji = '🔉';
        else if( parameter === 0 )
            emoji = '🔇';
        else
            emoji = '🔈';

        reply += `\n${emoji} ${progress} ${parameter*10}%`;

        reply += '```'

        connection.channel.send(reply);
    }
}

module.exports = SetVolumeCommand;