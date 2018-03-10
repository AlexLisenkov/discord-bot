import AbstractModel from "./AbstractModel";

export default class Statistics_HighestGuilds extends AbstractModel
{
    public ref: string = 'statistics/global';
    public global: boolean = true;
    public staticKey: string = 'guild_peed';

    public increment():void {
        this.data.transaction( current => {
            return (current || 0) +1;
        });
    }
}
