import { mongodbConnect, mongodbDisconnect } from "./mongodb.database";
import signale from "signale";

const database = () => {
    const connect = async () => {
        try{
            return await mongodbConnect();
        } catch(error){
            throw signale.fatal(new Error("Error de conección con la base de datos"));
        }
    };

    const disconnect = async () => {
        try{
            return await mongodbDisconnect();
        } catch(error){
            throw signale.fatal(new Error("Error de desconexión con la base de datos"));
        }
    }

    return { connect, disconnect };
}

export default database