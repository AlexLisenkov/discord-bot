"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config/Config");
const YoutubeConfig_1 = require("../Config/YoutubeConfig");
const Song_1 = require("../YouTube/Song");
const discord_js_1 = require("discord.js");
const Guild_1 = require("../Database/Guild");
const Client_1 = require("./Client");
const Statistics_TotalSongs_1 = require("../Database/Statistics_TotalSongs");
const Statistics_TotalSeconds_1 = require("../Database/Statistics_TotalSeconds");
const Statistics_TotalPlaying_1 = require("../Database/Statistics_TotalPlaying");
class VoiceConnection {
    constructor(guild) {
        this.queue = [];
        this.triggered = false;
        this.isMuted = false;
        this.prefix = Config_1.default.prefix;
        this.statistics_totalSeconds = new Statistics_TotalSeconds_1.default();
        this.statistics_totalSongs = new Statistics_TotalSongs_1.default();
        this.statistic_totalPlaying = new Statistics_TotalPlaying_1.default();
        this.disconnectAfter = 1000 * 90;
        this.database = new Guild_1.default(guild.id);
        this.channel = Client_1.default.getMessageableTextChannel(guild);
        this.database.guildConfig.setKey('prefix').data.on('value', value => {
            if (value.val())
                this.prefix = value.val();
        });
        this.database.djRole.data.on('value', value => {
            this.djRole = value.val();
        });
        this.database.djCommands.data.on('value', value => {
            let collect = new discord_js_1.Collection();
            for (let x in value.val())
                collect.set(x, value.val()[x]);
            this.djCommands = collect;
        });
        this.database.blacklist.data.on('value', value => {
            let collect = new discord_js_1.Collection();
            for (let x in value.val())
                collect.set(x, value.val()[x]);
            this.blacklist = collect;
        });
        this.database.disallowedVoiceChannels.data.on('value', value => {
            let collect = new discord_js_1.Collection();
            for (let x in value.val())
                collect.set(x, value.val()[x]);
            this.disallowedVoiceChannels = collect;
        });
        this.setDisconnectTimer();
    }
    play() {
        if (this.triggered) {
            console.error('Play triggered whilst playing');
            return false;
        }
        if (this.queue.length <= 0) {
            return this.channel.send('Queue empty').then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
        }
        if (!this.voiceChannel.connection) {
            this.voiceChannel.join();
        }
        const song = this.queue.shift();
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
        this.channel.send('', { embed: embed }).then((msg) => {
            msg.delete(Config_1.default.message_lifetime);
        });
        try {
            this.dispatcher = this.voiceChannel.connection.playStream(song.stream, YoutubeConfig_1.default.default_stream_options);
            this.timer = new Date();
            this.dispatcher.on('error', console.error);
        }
        catch (error) {
            console.error(error.message);
            return this.channel.send(`Something went wrong, if you see this message please report this at https://pleyr.net/support.\nError message: "${error.message}"`);
        }
        if (!this.timer || !this.dispatcher)
            return false;
        this.currentSong = song;
        const author_id = this.currentSong.author.id;
        if (Config_1.default.environment == 'production') {
            this.statistic_totalPlaying.increment();
            this.statistics_totalSongs.increment();
            this.database.totalSongs.increment();
            this.database.statistics.memberStatistics(author_id).incrementTotalSongs();
            this.voiceChannel.members.forEach(member => {
                if (!member.deaf && !member.user.bot)
                    this.database.statistics.memberStatistics(member.id).incrementTotalSongsListened();
            });
        }
        this.triggered = true;
        this.dispatcher.once('end', () => {
            let timeout = setTimeout(() => {
                this.currentSong = null;
                this.triggered = false;
                if (this.queue.length > 0) {
                    this.play();
                }
                if (Config_1.default.environment == 'production') {
                    const totalTime = (new Date() - this.timer) / 1000;
                    this.statistic_totalPlaying.decrement();
                    this.statistics_totalSeconds.incrementWith(totalTime);
                    this.database.totalSeconds.incrementWith(totalTime);
                    this.database.statistics.memberStatistics(author_id).incrementTotalSecondsWith(totalTime);
                    if (this.voiceChannel) {
                        this.voiceChannel.members.forEach(member => {
                            if (!member.deaf && !member.user.bot)
                                this.database.statistics.memberStatistics(member.id).incrementTotalSecondsListenedWith(totalTime);
                        });
                    }
                }
                this.setDisconnectTimer();
                clearTimeout(timeout);
            }, 1000);
        });
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
        if (this.dispatcher && this.dispatcher.paused)
            this.resume();
        this.triggered = false;
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
            this.voiceChannel.leave();
            this.voiceChannel = undefined;
        }
    }
    setDisconnectTimer() {
        if (this.timeToDisconnect()) {
            let timeout = setTimeout(() => {
                clearTimeout(timeout);
                this.disconnectWhenChannelIsEmpty();
            }, this.disconnectAfter);
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
            this.channel.send(`Queue limit of ${Config_1.default.queue_limit} exceeded`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return false;
        }
        if (this.songIsBlacklisted(element.youtubeId)) {
            this.channel.send(`❌ The song '${element.snippet.title}' is blacklisted`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
            return false;
        }
        this.queue.push(element);
        if (replyPosition)
            this.channel.send(`Queued up **${element.snippet.title}** on position ${this.queue.length}`).then((msg) => {
                msg.delete(Config_1.default.message_lifetime);
            });
        if (!this.triggered)
            this.play();
        return true;
    }
    disconnectWhenChannelIsEmpty() {
        if (this.timeToDisconnect()) {
            return this.disconnect();
        }
    }
    timeToDisconnect() {
        return !(!this.voiceChannel || !this.voiceChannel.connection || (this.voiceChannel.members.size > 1 && this.triggered));
    }
    seekCurrentSong(time) {
        if (!this.currentSong)
            return null;
        const song = new Song_1.default(this.currentSong.item);
        song.begin = time;
        song.author = this.currentSong.author;
        this.queue.unshift(song);
        this.skip();
    }
    songIsBlacklisted(youtubeId) {
        return this.blacklist.find((el) => {
            return el == youtubeId;
        }) != null;
    }
    move(oldIndex, newIndex) {
        if (this.queue.length <= 0)
            return false;
        while (oldIndex < 0) {
            oldIndex += this.queue.length;
        }
        while (newIndex < 0) {
            newIndex += this.queue.length;
        }
        if (newIndex >= this.queue.length) {
            let k = newIndex - this.queue.length;
            while ((k--) + 1) {
                this.queue.push(undefined);
            }
        }
        this.queue.splice(newIndex, 0, this.queue.splice(oldIndex, 1)[0]);
        return true;
    }
    shuffle() {
        this.queue = this.arrayShuffle(this.queue);
        this.bufferNextSongStream();
        return true;
    }
    arrayShuffle(arr) {
        return arr.map(a => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map(a => a[1]);
    }
    ;
}
exports.default = VoiceConnection;
//# sourceMappingURL=VoiceConnection.js.map