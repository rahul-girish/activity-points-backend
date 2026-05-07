const mongoose = require('mongoose');

/**
 *  connectDB
 *  Connect to a database via a MongoDB URI.
 */
const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected at ${conn.connection.host}`);
    } catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;