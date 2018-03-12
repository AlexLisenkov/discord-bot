import AbstractModel from "./AbstractModel";
import Statistics_HighestGuilds from "./Statistics_HighestGuilds";

export default class Statistics_TotalPlaying extends AbstractModel
{
    public ref: string = 'statistics/global';
    public global: boolean = true;
    public staticKey: string = 'total_playing';

    public increment():void {
        this.data.transaction( current => {
            return (current || 0) +1;
        });
    }

    public decrement():void {
        this.data.transaction( current => {
            return (current || 0) -1;
        });
    }
}
