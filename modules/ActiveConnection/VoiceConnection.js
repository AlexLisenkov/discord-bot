const Client = require("./Client");
const YoutubeConfig = require("../../youtube.config.json");
const queue = require("../Queue/queue");

let dispatcher = null;
let triggered = false;

class VoiceConnection
{
    constructor() {
        throw "Class VoiceConnection must explicitly be called statically";
    }

    static isTriggered() {
        return triggered;
    }

    static play() {
        if( !queue.length ) {
            return Client.instance.voiceConnections.forEach(V => {
                V.send('Queue empty');
            });
        }

        const song = queue.shift();
        Client.instance.voiceConnections.forEach(V => {
            // @todo: show upcoming song
            dispatcher = V.playStream(song.stream, YoutubeConfig.default_stream_options);
            dispatcher.on('end', () => {
                let timeout = setTimeout(() => {
                    if (queue.length > 0) {
                        VoiceConnection.play();
                    } else {
                        triggered = false;
                        clearTimeout(timeout);
                    }
                }, 1000);
            });
        });
        triggered = true;
    }

    static skip() {
        if( dispatcher.paused )
            VoiceConnection.play();
        dispatcher.end();
    }

    static pause() {
        if( dispatcher.paused )
            VoiceConnection.resume();
        dispatcher.pause();
    }

    static resume() {
        if( !dispatcher.paused )
            VoiceConnection.pause();
        dispatcher.resume();
    }

    static truncate() {
        queue.length = 0;
        VoiceConnection.skip();
    }

}

module.exports = VoiceConnection;