import AbstractModel from "./AbstractModel";

export default class Statistics_TotalSongs extends AbstractModel
{
    public ref: string = 'statistics/global';
    public global: boolean = true;
    public staticKey: string = 'total_songs';

    public increment():void {
        this.data.transaction( current => {
            return (current || 0) +1;
        });
    }
}
