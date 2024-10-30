import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function connectionToMongodb() {
    mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connection successful');
    });

    mongoose.connection.on('error', (err) => {
        console.error(err);
        console.log('MongoDB connection unsuccessful');
    });
}

export default connectionToMongodb;
