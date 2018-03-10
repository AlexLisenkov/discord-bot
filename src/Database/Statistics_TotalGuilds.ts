import AbstractModel from "./AbstractModel";
import Statistics_HighestGuilds from "./Statistics_HighestGuilds";

export default class Statistics_TotalGuilds extends AbstractModel
{
    public ref: string = 'statistics/global';
    public global: boolean = true;
    public staticKey: string = 'total_guilds';

    public increment():void {
        this.data.transaction( current => {
            return (current || 0) +1;
        });
        new Statistics_HighestGuilds().increment();
    }

    public decrement():void {
        this.data.transaction( current => {
            return (current || 0) -1;
        });
    }
}
