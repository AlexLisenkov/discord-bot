const YoutubeConfig = require("../../youtube.config.json");
const YouTube = require("../YouTube/YouTube");
const Config = require("../../config.json");
const Song = require('../YouTube/Song');

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

    get currentSong() {
        return this._currentSong;
    }
    set currentSong( song ) {
        this._currentSong = song;
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

    push( element, replyPosition = true ) {
        if( !element instanceof Song)
            return this.channel.send(`Oops.. an error occured (Song instance failed)`);

        if( this.queue.length >= Config.queue_limit && Config.queue_limit > 0 )
            return this.channel.send(`Queue limit of ${Config.queue_limit} exceeded`);

        this.queue.push(element);
        if( replyPosition )
            this.channel.send(`Queued up **${element.snippet.title}** on position ${this.length}`);
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

        if( !song instanceof Song)
            return this.play();

        // The steam is buffered at this location because of require problems with YouTube in Song
        // Problems are most likely to be caused by circular dependencies
        let stream;
        if( song.stream )
            stream = song.stream;
        else
            stream = YouTube.getDataStream(song.youtubeId, false);

        this.loadNextSongStream();

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

        this.channel.send('', {embed, embed});

        this.dispatcher = this.voiceChannel.connection.playStream(
            stream,
            YoutubeConfig.default_stream_options
        );

        this.currentSong = song;

        this.dispatcher.on('end', () => {
            let timeout = setTimeout(() => {
                this.currentSong = null;
                if (this.length > 0) {
                    this.play()
                } else {
                    this.triggered = false;
                    clearTimeout(timeout);
                }
            }, 1000);
        });
        this.triggered = true;
        this.dispatcher.on('error', console.error );
    }

    setVolume( volume ) {
        if( !this.dispatcher )
            return;
        this.dispatcher.setVolume(volume);
    }

    mute( ) {
        if( !this.dispatcher && !this._isMuted )
            return;
        this._isMuted = true;
        this._volumeBeforeMute = this.dispatcher.volume;
        this.dispatcher.setVolume(0);
    }

    unMute( ) {
        if( !this.dispatcher && this._isMuted )
            return;
        this._isMuted = false;
        this._volumeBeforeMute = (this._volumeBeforeMute ? this._volumeBeforeMute : YoutubeConfig.default_stream_options.volume)
        this.dispatcher.setVolume(this._volumeBeforeMute);
    }

    skip() {
        if( this.dispatcher.paused )
            this.play();
        this.dispatcher.end();
    }

    removeIndex(index) {
        index = parseInt(index);
        if( this._queue[index] !== undefined )
            this._queue.splice(index, 1);
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
        this.truncate();
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

    loadNextSongStream() {
        if( this.length < 1 )
            return;
        this._queue[0].stream = YouTube.getDataStream(this._queue[0].youtubeId, false);
    }

}

module.exports = VoiceConnection;