import mongoose from "mongoose";

const DB_URL = process.env.DB_URL || "mongodb+srv://urekmazino:je52xfDdB1khZUZm@worker-app-database.i7no2ax.mongodb.net/user-api?retryWrites=true&w=majority"

export const database = async () => {
    try {
        await mongoose
            .connect(DB_URL);
        console.log("Connected to database.");
    } catch {
        console.log("Something went worong , cannot connect to database :(");
    }
}
