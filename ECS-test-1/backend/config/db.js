const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose
            .connect(`mongodb://mongodb/${process.env.KEY_VALUE_DB}`, {
                auth: {
                    username: process.env.KEY_VALUE_USER,
                    password: process.env.KEY_VALUE_PASSWORD,
                },
                connectTimeoutMS: 500,
            });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = { connectDB }
