import AbstractModel from "./AbstractModel";

export default class Statistics_GuildSongs extends AbstractModel
{
    public ref: string = 'statistics/guilds';
    public staticKey: string = 'total_songs';

    public increment():void {
        this.data.transaction( current => {
            return (current || 0) +1;
        });
    }
}
