"use strict";
exports.__esModule = true;
var Config_1 = require("../Config/Config");
var YoutubeConfig_1 = require("../Config/YoutubeConfig");
var VoiceConnection = /** @class */ (function () {
    function VoiceConnection(voiceChannel, channel) {
        this.queue = [];
        this.triggered = false;
        this.isMuted = false;
        this.voiceChannel = voiceChannel;
        this.channel = channel;
    }
    VoiceConnection.prototype.play = function () {
        var _this = this;
        if (this.queue.length <= 0) {
            return this.channel.send('Queue empty');
        }
        if (!this.voiceChannel.connection)
            this.voiceChannel.join();
        var song = this.queue.shift();
        this.bufferNextSongStream();
        var embed = {
            title: song.snippet.title,
            url: song.url,
            description: song.snippet.channelTitle,
            thumbnail: {
                "url": song.snippet.thumbnails["default"].url
            },
            author: {
                'name': '🎶 Now playing',
                'url': 'https://discord.gg'
            },
            footer: {
                'text': "Added by " + song.author.username
            }
        };
        this.channel.send('', { embed: embed });
        console.log(song);
        this.dispatcher = this.voiceChannel.connection.playStream(song.stream, YoutubeConfig_1["default"].default_stream_options);
        this.currentSong = song;
        this.dispatcher.on('end', function () {
            var timeout = setTimeout(function () {
                _this.currentSong = null;
                if (_this.queue.length > 0) {
                    _this.play();
                }
                else {
                    _this.triggered = false;
                    clearTimeout(timeout);
                }
            }, 1000);
        });
        this.triggered = true;
        this.dispatcher.on('error', console.error);
    };
    VoiceConnection.prototype.setVolume = function (volume) {
        if (this.dispatcher)
            this.dispatcher.setVolume(volume);
    };
    VoiceConnection.prototype.mute = function () {
        if (!this.dispatcher && !this.isMuted)
            return false;
        this.isMuted = true;
        this.volumeBeforeMute = this.dispatcher.volume;
        this.dispatcher.setVolume(0);
        return true;
    };
    VoiceConnection.prototype.unMute = function () {
        if (!this.dispatcher || this.isMuted)
            return false;
        this.isMuted = false;
        this.volumeBeforeMute = (this.volumeBeforeMute ? this.volumeBeforeMute : YoutubeConfig_1["default"].default_stream_options.volume);
        this.dispatcher.setVolume(this.volumeBeforeMute);
        return true;
    };
    VoiceConnection.prototype.skip = function () {
        if (this.dispatcher.paused)
            this.play();
        this.dispatcher.end();
    };
    VoiceConnection.prototype.removeIndex = function (index) {
        if (this.queue[index] !== undefined) {
            this.queue.splice(index, 1);
            return true;
        }
        return false;
    };
    VoiceConnection.prototype.pause = function () {
        if (this.dispatcher.paused)
            this.resume();
        this.dispatcher.pause();
    };
    VoiceConnection.prototype.resume = function () {
        if (!this.dispatcher.paused)
            this.pause();
        this.dispatcher.resume();
    };
    VoiceConnection.prototype.disconnect = function () {
        this.truncate();
        if (this.voiceChannel !== undefined && this.voiceChannel.connection !== undefined) {
            this.voiceChannel.connection.disconnect();
        }
    };
    VoiceConnection.prototype.truncate = function () {
        this.queue = [];
        if (this.dispatcher !== undefined)
            this.skip();
    };
    VoiceConnection.prototype.bufferNextSongStream = function () {
        if (this.queue.length < 1)
            return null;
        this.queue[0].buffer();
    };
    VoiceConnection.prototype.pushToQueue = function (element, replyPosition) {
        if (replyPosition === void 0) { replyPosition = true; }
        if (this.queue.length >= Config_1["default"].queue_limit && Config_1["default"].queue_limit > 0) {
            this.channel.send("Queue limit of " + Config_1["default"].queue_limit + " exceeded");
            return false;
        }
        this.queue.push(element);
        if (replyPosition)
            this.channel.send("Queued up **" + element.snippet.title + "** on position " + this.queue.length);
        if (!this.triggered)
            this.play();
        return true;
    };
    return VoiceConnection;
}());
exports["default"] = VoiceConnection;
