import { set, connect } from 'mongoose';

const connectDB = async () => {
    try {
        set("strictQuery", false);
        const conn = await connect('mongodb://drumil:blQQmwf5l3x7J19q@ac-gfjl1fr-shard-00-00.f5iwz7r.mongodb.net:27017,ac-gfjl1fr-shard-00-01.f5iwz7r.mongodb.net:27017,ac-gfjl1fr-shard-00-02.f5iwz7r.mongodb.net:27017/WiseWater?ssl=true&replicaSet=atlas-nbjn1s-shard-0&authSource=admin&retryWrites=true&w=majority');
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    } catch (err) {
        console.log(`DATABASE Connect Error: ${err}`);
        process.exit(1);
    }
}

export default connectDB;