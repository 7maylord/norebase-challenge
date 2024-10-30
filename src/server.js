import app from './app.js'
import connectionToMongodb from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
connectionToMongodb();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });