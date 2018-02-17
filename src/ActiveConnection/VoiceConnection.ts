import Config from "../Config/Config";
import YoutubeConfig from "../Config/YoutubeConfig";
import Song from "../YouTube/Song";
import {TextChannel, StreamDispatcher, VoiceChannel, DMChannel, GroupDMChannel, Snowflake} from "discord.js";
import Guild from "../Database/Guild";

export default class VoiceConnection
{
    public queue:Song[] = [];
    public dispatcher:StreamDispatcher;
    public currentSong:Song;
    public voiceChannel:VoiceChannel;
    public channel:TextChannel|DMChannel|GroupDMChannel;
    public volumeBeforeMute:number;
    public triggered:boolean = false;
    public isMuted:boolean = false;
    public database:Guild;

    constructor( voiceChannel:VoiceChannel, channel:TextChannel|DMChannel|GroupDMChannel, guildId:Snowflake ) {
        this.voiceChannel = voiceChannel;
        this.channel = channel;
        this.database = new Guild(guildId);
    }

    play():any {
        if( this.queue.length <= 0 ) {
            return this.channel.send('Queue empty');
        }

        if( !this.voiceChannel.connection )
            this.voiceChannel.join();

        const song = this.queue.shift();

        song.buffer();
        this.bufferNextSongStream();

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

        this.channel.send('', {embed: embed});

        this.dispatcher = this.voiceChannel.connection.playStream(
            song.stream,
            YoutubeConfig.default_stream_options
        );

        this.currentSong = song;

        this.dispatcher.on('end', () => {
            let timeout = setTimeout(() => {
                this.currentSong = null;
                if (this.queue.length > 0) {
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
            this.channel.send(`Queue limit of ${Config.queue_limit} exceeded`);
            return false;
        }

        this.database.blacklist.data.orderByValue().equalTo(element.youtubeId).once('value').then( (row) => {
            if( row.val() !== null ){
                this.channel.send(`The song '${element.snippet.title}' is blacklisted by the owner 😔`);
                return false;
            } else {
                this.queue.push(element);
                if( replyPosition )
                    this.channel.send(`Queued up **${element.snippet.title}** on position ${this.queue.length}`);
                if( !this.triggered )
                    this.play();
                return true;
            }
        });
    }

}