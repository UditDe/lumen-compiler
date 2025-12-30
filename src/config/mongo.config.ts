import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(
            `MongoDB connected: http://${conn.connection.host}:${conn.connection.port}`
        );
    } catch (error) {
        console.error(
            `Error: ${error}\nconnection uri => ${process.env.MONGO_URI}`
        );
        process.exit(1);
    }
};
