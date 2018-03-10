import AbstractModel from "./AbstractModel";

export default class Statistics_TotalSeconds extends AbstractModel
{
    public ref: string = 'statistics/global';
    public global: boolean = true;
    public staticKey: string = 'total_seconds';

    public incrementWith(seconds:number):void {
        this.data.transaction( current => {
            return (current || 0) + seconds;
        });
    }
}
