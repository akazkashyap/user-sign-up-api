import mongoose from "mongoose";

const DB_URL = process.env.DB_URL

export const database = async () => {
    try {
        await mongoose
            .connect(DB_URL);
        console.log("Connected to database.");
    } catch {
        console.log("Something went worong , cannot connect to database :(");
    }
}
