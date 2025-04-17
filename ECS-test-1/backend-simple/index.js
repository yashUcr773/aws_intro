const express = require('express');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todos')

dotenv.config();

const initApp = async () => {
    const app = express();
    app.use(express.json());

    app.use('/api/todos', todoRoutes);
    app.use('/', (req, res) => {
        res.send('Hello World!');
    });
    return app;
};

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    initApp().then(app => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });
}

module.exports = initApp;
