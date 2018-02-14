"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config/Config");
const YoutubeConfig_1 = require("../Config/YoutubeConfig");
class VoiceConnection {
    constructor(voiceChannel, channel) {
        this.queue = [];
        this.triggered = false;
        this.isMuted = false;
        this.voiceChannel = voiceChannel;
        this.channel = channel;
    }
    play() {
        if (this.queue.length <= 0) {
            return this.channel.send('Queue empty');
        }
        if (!this.voiceChannel.connection)
            this.voiceChannel.join();
        const song = this.queue.shift();
        song.buffer();
        this.bufferNextSongStream();
        const embed = {
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
        this.channel.send('', { embed: embed });
        this.dispatcher = this.voiceChannel.connection.playStream(song.stream, YoutubeConfig_1.default.default_stream_options);
        this.currentSong = song;
        this.dispatcher.on('end', () => {
            let timeout = setTimeout(() => {
                this.currentSong = null;
                if (this.queue.length > 0) {
                    this.play();
                }
                else {
                    this.triggered = false;
                    clearTimeout(timeout);
                }
            }, 1000);
        });
        this.triggered = true;
        this.dispatcher.on('error', console.error);
    }
    setVolume(volume) {
        if (this.dispatcher)
            this.dispatcher.setVolume(volume);
    }
    mute() {
        if (!this.dispatcher || this.isMuted)
            return false;
        this.isMuted = true;
        this.volumeBeforeMute = this.dispatcher.volume;
        this.dispatcher.setVolume(0);
        return true;
    }
    unMute() {
        if (!this.dispatcher || !this.isMuted)
            return false;
        this.isMuted = false;
        this.volumeBeforeMute = (this.volumeBeforeMute ? this.volumeBeforeMute : YoutubeConfig_1.default.default_stream_options.volume);
        this.dispatcher.setVolume(this.volumeBeforeMute);
        return true;
    }
    skip() {
        if (this.dispatcher.paused)
            this.play();
        this.dispatcher.end();
    }
    removeIndex(index) {
        if (this.queue[index] !== undefined) {
            this.queue.splice(index, 1);
            return true;
        }
        return false;
    }
    pause() {
        if (this.dispatcher.paused) {
            return false;
        }
        this.dispatcher.pause();
        return true;
    }
    resume() {
        if (!this.dispatcher.paused) {
            return false;
        }
        this.dispatcher.resume();
        return true;
    }
    disconnect() {
        this.truncate();
        if (this.voiceChannel !== undefined && this.voiceChannel.connection !== undefined) {
            this.voiceChannel.connection.disconnect();
        }
    }
    truncate() {
        this.queue = [];
        if (this.dispatcher !== undefined)
            this.skip();
    }
    bufferNextSongStream() {
        if (this.queue.length > 0)
            this.queue[0].buffer();
    }
    pushToQueue(element, replyPosition = true) {
        if (this.queue.length >= Config_1.default.queue_limit && Config_1.default.queue_limit > 0) {
            this.channel.send(`Queue limit of ${Config_1.default.queue_limit} exceeded`);
            return false;
        }
        this.queue.push(element);
        if (replyPosition)
            this.channel.send(`Queued up **${element.snippet.title}** on position ${this.queue.length}`);
        if (!this.triggered)
            this.play();
        return true;
    }
}
exports.default = VoiceConnection;
//# sourceMappingURL=VoiceConnection.js.map