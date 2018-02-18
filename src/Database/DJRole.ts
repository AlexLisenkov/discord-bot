import AbstractModel from "./AbstractModel";

export default class DJRole extends AbstractModel
{
    public ref: string = 'dj_role';

    public getDjRole():Promise<string>{
        return this.data.once('value').then( (value => {
            return value.val();
        }));
    }
}
