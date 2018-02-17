import * as firebase from 'firebase';
import Config from "../Config/Config";

export default abstract class Firebase
{
    private static _instance: firebase.app.App;

    public static get instance(): firebase.app.App {
        if( Firebase._instance != null )
            return Firebase._instance;
        Firebase._instance =  firebase.initializeApp(Config.firebase);
        return Firebase._instance;
    }

    public static get database(): firebase.database.Database {
        return Firebase.instance.database();
    }

    private constructor() {
        throw new Error("Class must explicitly be called as singleton");
    }
}
