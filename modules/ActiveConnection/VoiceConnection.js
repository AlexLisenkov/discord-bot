const YoutubeConfig = require("../../youtube.config.json");
const Config = require("../../config.json");
const VoiceConnections = require("./VoiceConnections");

class VoiceConnection
{
    constructor( voiceChannel, channel ) {
        this.voiceChannel = voiceChannel;
        this.channel = channel;
        this.triggered = false;
        this._queue = [];
    }

    get dispatcher() {
        return this._dispach;
    }
    set dispatcher( dispatcher ) {
        this._dispach = dispatcher;
    }

    get voiceChannel() {
        return this._voiceChannel;
    }
    set voiceChannel( channel ) {
        this._voiceChannel = channel;
    }

    get channel() {
        return this._channel;
    }
    set channel( channel ) {
        this._channel = channel;
    }

    get queue() {
        return this._queue;
    }

    get length() {
        return this._queue.length;
    }

    set length( len ) {
        return this._queue = len;
    }

    get triggered() {
        return this._triggered;
    }
    set triggered( state ) {
        this._triggered = state;
    }

    shift() {
        return this.queue.shift();
    }

    push( element ) {
        if( this.queue.length >= Config.queue_limit && Config.queue_limit > 0 )
            return this.channel.send(`Queue limit of ${Config.queue_limit} exceeded`);

        this.queue.push(element);
        this.channel.send(`Queued up **${element.data.title}** on position ${this.length}`);
        if( !this.triggered )
            this.play();
    }

    play() {
        if( this.length <= 0 ) {
            return this.channel.send('Queue empty');
        }

        if( !this.voiceChannel.connection )
            this.voiceChannel.join();

        const song = this.shift();
        this.channel.send(`\`\`\`markdown\n 🎶 Now playing:\n\t ${song.data.title} \n added by ${song.author}\`\`\``);
        this.dispatcher = this.voiceChannel.connection.playStream(song.stream, YoutubeConfig.default_stream_options);
        this.dispatcher.on('end', () => {
            let timeout = setTimeout(() => {
                if (this.length > 0) {
                    this.play();
                } else {
                    this.triggered = false;
                    clearTimeout(timeout);
                }
            }, 1000);
        });
        this.triggered = true;
    }

    skip() {
        if( this.dispatcher.paused )
            this.play();
        this.dispatcher.end();
    }

    pause() {
        if( this.dispatcher.paused )
            this.resume();
        this.dispatcher.pause();
    }

    resume() {
        if( !this.dispatcher.paused )
            this.pause();
        this.dispatcher.resume();
    }

    disconnect() {
        this.truncate()
        if( this.voiceChannel !== undefined && this.voiceChannel.connection !== undefined ) {
            this.voiceChannel.connection.disconnect();
        }
        delete this;
    }

    truncate() {
        this._queue = [];
        if( this.dispatcher !== undefined )
            this.skip();
    }

}

module.exports = VoiceConnection;