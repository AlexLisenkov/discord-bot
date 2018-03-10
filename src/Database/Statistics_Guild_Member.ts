import AbstractModel from "./AbstractModel";

export default class Statistics_Guild_Member extends AbstractModel
{
    public ref:string = '';

    public incrementTotalSecondsWith(seconds:number){
        this.setKey('total_seconds_queued').data.transaction( current => {
            return (current || 0) + seconds;
        });
    }

    public incrementTotalSongs(){
        this.setKey('total_songs_queued').data.transaction( current => {
            return (current || 0) + 1;
        });
    }

    public incrementTotalSecondsListenedWith(seconds:number){
        this.setKey('total_seconds_listened').data.transaction( current => {
            return (current || 0) + seconds;
        });
    }

    public incrementTotalSongsListened(){
        this.setKey('total_songs_listened').data.transaction( current => {
            return (current || 0) + 1;
        });
    }
}
