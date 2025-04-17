const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { connectRedis } = require('./config/redis');
const todoRoutes = require('./routes/todos')

dotenv.config();

const initApp = async () => {
    const app = express();
    app.use(express.json());

    await connectDB();
    await connectRedis();

    app.use('/api/todos', todoRoutes);
    return app;
};

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    initApp().then(app => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });
}

module.exports = initApp;
