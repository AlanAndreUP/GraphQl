import mongoose from "mongoose";
import signale from "signale";

export const mongodbConnect = async () => {
    const uri = "mongodb+srv://JeshuaMR:JeshuaMR@cuatrifj.ejyg1tv.mongodb.net/Cuatri5";

    if(!uri){
        throw signale.fatal(new Error("La variable de entorno MONGODB_URI no existe"));
    }

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as mongoose.ConnectOptions);

    const db = mongoose.connection;

    db.on("error", (error) => {
        signale.fatal(new Error("Error de conexión a la base de datos:"));
    });

    db.once("open", () => {
        signale.success("Conexión exitosa a la base de datos MongoDB.");
    });
}

export const mongodbDisconnect = async () => {
    await mongoose.disconnect();
}