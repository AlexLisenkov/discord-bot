import Config from "../Config/Config";
import YoutubeConfig from "../Config/YoutubeConfig";
import Song from "../YouTube/Song";
import {
    TextChannel, StreamDispatcher, VoiceChannel, Message, Collection, Guild as DiscordGuild
} from "discord.js";
import Guild from "../Database/Guild";
import Client from "./Client";
import Statistics_TotalSongs from "../Database/Statistics_TotalSongs";
import Statistics_TotalSeconds from "../Database/Statistics_TotalSeconds";
import {type} from "os";
import {Readable} from "stream";
import Statistics_GuildSongs from "../Database/Statistics_GuildSongs";
import Statistics_GuildSeconds from "../Database/Statistics_GuildSeconds";

export default class VoiceConnection
{
    public queue:Song[] = [];
    public dispatcher:StreamDispatcher;
    public currentSong:Song;
    public timer:Date;
    public voiceChannel:VoiceChannel;
    public channel:TextChannel;
    public volumeBeforeMute:number;
    public triggered:boolean = false;
    public isMuted:boolean = false;
    public database:Guild;
    public djRole:string;
    public prefix:string = Config.prefix;
    public djCommands:Collection<string, string>;
    public blacklist:Collection<string, string>;
    public statistics_totalSeconds:Statistics_TotalSeconds = new Statistics_TotalSeconds();
    public statistics_totalSongs:Statistics_TotalSongs = new Statistics_TotalSongs();
    public disallowedVoiceChannels:Collection<string, string>;
    protected disconnectAfter:number = 1000*60*4;

    constructor( guild:DiscordGuild ) {
        this.database = new Guild(guild.id);
        this.channel = Client.getMessageableTextChannel(guild);

        this.database.guildConfig.setKey('prefix').data.on('value', value => {
            if( value.val() )
                this.prefix = value.val();
        });
        this.database.djRole.data.on('value', value => {
            this.djRole = value.val();
        });
        this.database.djCommands.data.on('value', value => {
            let collect = <Collection<string, string>> new Collection();
            for( let x in value.val() )
                collect.set(x, value.val()[x]);
            this.djCommands = collect;
        });
        this.database.blacklist.data.on('value', value => {
            let collect = <Collection<string, string>> new Collection();
            for( let x in value.val() )
                collect.set(x, value.val()[x]);
            this.blacklist = collect;
        });
        this.database.disallowedVoiceChannels.data.on('value', value => {
            let collect = <Collection<string, string>> new Collection();
            for( let x in value.val() )
                collect.set(x, value.val()[x]);
            this.disallowedVoiceChannels = collect;
        });

        this.disconnectWhenChannelIsEmpty();
    }

    play():any {
        if( this.queue.length <= 0 ) {
            return this.channel.send('Queue empty').then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
        }

        if( !this.voiceChannel.connection )
            this.voiceChannel.join();

        const song = this.queue.shift();


        song.buffer();
        this.bufferNextSongStream();
        song.stream;
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

        this.channel.send('', {embed: embed}).then( (msg: Message) => {
            msg.delete(Config.message_lifetime);
        });
        try {
            this.dispatcher = this.voiceChannel.connection.playStream(
                song.stream
            );
            this.timer = new Date();
        } catch (error) {
            console.error(error.message);
        }

        this.currentSong = song;
        const author_id = this.currentSong.author.id;
        if( Config.environment == 'production') {
            this.statistics_totalSongs.increment();
            this.database.totalSongs.increment();
            this.database.statistics.memberStatistics(author_id).incrementTotalSongs();
            this.voiceChannel.members.forEach( member => {
                if( !member.deaf && !member.user.bot)
                    this.database.statistics.memberStatistics(member.id).incrementTotalSongsListened();
            });
        }

        this.dispatcher.on('end', () => {
            let timeout = setTimeout(() => {
                this.currentSong = null;
                if( Config.environment == 'production'){
                    const totalTime = (<any>new Date() - <any>this.timer )/ 1000;
                    this.statistics_totalSeconds.incrementWith(totalTime);
                    this.database.totalSeconds.incrementWith(totalTime);
                    this.database.statistics.memberStatistics(author_id).incrementTotalSecondsWith(totalTime);
                    this.voiceChannel.members.forEach( member => {
                        if( !member.deaf && !member.user.bot)
                            this.database.statistics.memberStatistics(member.id).incrementTotalSecondsListenedWith(totalTime);
                    });
                }

                if (this.queue.length > 0) {
                    this.play();
                } else {
                    this.triggered = false;
                    clearTimeout(timeout);
                }
            }, 1000);
        });
        this.triggered = true;
        this.dispatcher.on('error', console.error );
    }

    setVolume( volume:number ):void {
        if( this.dispatcher )
            this.dispatcher.setVolume(volume);
    }

    mute():boolean {
        if( !this.dispatcher || this.isMuted )
            return false;

        this.isMuted = true;
        this.volumeBeforeMute = this.dispatcher.volume;
        this.dispatcher.setVolume(0);
        return true;
    }

    unMute():boolean {
        if( !this.dispatcher || !this.isMuted )
            return false;

        this.isMuted = false;
        this.volumeBeforeMute = (this.volumeBeforeMute ? this.volumeBeforeMute : (<any>YoutubeConfig.default_stream_options).volume);
        this.dispatcher.setVolume(this.volumeBeforeMute);
        return true;
    }

    skip():void {
        if( this.dispatcher.paused )
            this.resume();
        this.triggered = false;
        this.dispatcher.end();
    }

    removeIndex(index:number):boolean {
        if( this.queue[index] !== undefined ){
            this.queue.splice(index, 1);
            return true;
        }
        return false;
    }

    pause():boolean {
        if( this.dispatcher.paused ){
            return false;
        }
        this.dispatcher.pause();
        return true;
    }

    resume():boolean {
        if( !this.dispatcher.paused ){
            return false;
        }
        this.dispatcher.resume();
        return true;
    }

    disconnect():void {
        this.truncate();
        if( this.voiceChannel !== undefined && this.voiceChannel.connection !== undefined ) {
            this.voiceChannel.connection.disconnect();
            this.voiceChannel = undefined;
        }
    }

    truncate():void {
        this.queue = [];
        if( this.dispatcher !== undefined )
            this.skip();
    }

    bufferNextSongStream():void {
        if( this.queue.length > 0 )
            this.queue[0].buffer();
    }

    pushToQueue( element:Song, replyPosition:boolean = true ):boolean {
        if( this.queue.length >= Config.queue_limit && Config.queue_limit > 0 ){
            this.channel.send(`Queue limit of ${Config.queue_limit} exceeded`).then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return false;
        }

        if( this.songIsBlacklisted(element.youtubeId) ){
            this.channel.send(`❌ The song '${element.snippet.title}' is blacklisted`).then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
            return false;
        }

        this.queue.push(element);
        if( replyPosition )
            this.channel.send(`Queued up **${element.snippet.title}** on position ${this.queue.length}`).then( (msg: Message) => {
                msg.delete(Config.message_lifetime);
            });
        if( !this.triggered )
            this.play();
        return true;
    }

    disconnectWhenChannelIsEmpty():void {
        setTimeout( () => {
            if( !this.timeToDisconnect() )
                return this.disconnectWhenChannelIsEmpty();

            this.disconnect();
            return this.disconnectWhenChannelIsEmpty();
        }, this.disconnectAfter);
    }

    timeToDisconnect():boolean {
        return !( !this.voiceChannel || !this.voiceChannel.connection || (this.voiceChannel.members.size > 1 && this.triggered) );
    }

    seekCurrentSong( time:string ):void {
        if( !this.currentSong )
            return null;
        const song = new Song(this.currentSong.item);
        song.begin = time;
        song.author = this.currentSong.author;
        this.queue.unshift(song);
        this.skip();
    }

    songIsBlacklisted( youtubeId:string ):boolean {
        return this.blacklist.find((el) => {
            return el == youtubeId;
        }) != null;
    }

    move(oldIndex:number, newIndex:number):boolean {
        if( this.queue.length <= 0 )
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

    shuffle():boolean {
        this.queue = <Song[]>this.arrayShuffle(this.queue);
        this.bufferNextSongStream();
        return true;
    }

    arrayShuffle( arr ):object {
        return arr.map(a => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map(a => a[1])
    };

}