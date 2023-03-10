import { set, connect } from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config();
const connectDB = async () => {
    try {
        set("strictQuery", false);
        const conn = await connect(`${process.env.MONGO_URI}`);
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    } catch (err) {
        console.log(`DATABASE Connect Error: ${err}`);
        process.exit(1);
    }
}

export default connectDB;