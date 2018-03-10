import AbstractModel from "./AbstractModel";

export default class Statistics_GuildSeconds extends AbstractModel
{
    public ref: string = 'statistics/guilds';
    public staticKey: string = 'total_seconds';

    public incrementWith(seconds:number):void {
        this.data.transaction( current => {
            return (current || 0) + seconds;
        });
    }
}
