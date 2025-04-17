const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createClient } = require('redis');
const dotenv = require('dotenv');
const appInit = require('../index');

dotenv.config();

let app, redisClient, createdTodo;

beforeAll(async () => {
    // Create Redis client (mock or real)
    redisClient = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
    await redisClient.connect();
    await redisClient.flushAll(); // clear cache

    // Init express app
    app = await appInit(); // modified version of app.js
});

afterAll(async () => {
    await redisClient.quit();
});


describe('ToDo API', () => {
    it('should create a todo', async () => {
        const res = await request(app)
            .post('/api/todos')
            .send({ title: 'Test ToDo' });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test ToDo');
        createdTodo = res.body;
    });

    it('should get all todos (from DB)', async () => {
        const res = await request(app).get('/api/todos');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.source).toBe('db');
    });

    it('should get all todos (from cache)', async () => {
        const res = await request(app).get('/api/todos');
        expect(res.statusCode).toBe(200);
        expect(res.body.source).toBe('cache');
    });

    it('should update a todo', async () => {
        const res = await request(app)
            .put(`/api/todos/${createdTodo._id}`)
            .send({ title: 'Updated ToDo', completed: true });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Updated ToDo');
        expect(res.body.completed).toBe(true);
    });

    it('should delete a todo', async () => {
        const res = await request(app)
            .delete(`/api/todos/${createdTodo._id}`);

        expect(res.statusCode).toBe(204);
    });

    it('should return 404 on update for non-existent todo', async () => {
        const res = await request(app)
            .put(`/api/todos/607f1f77bcf86cd799439011`)
            .send({ title: 'Nothing' });

        expect(res.statusCode).toBe(404);
    });
});
