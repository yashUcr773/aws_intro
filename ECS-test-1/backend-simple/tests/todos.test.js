const request = require('supertest');
const appInit = require('../index');

let app;

beforeAll(async () => {
    // Init express app
    app = await appInit(); // modified version of app.js
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

    it('should get all todos', async () => {
        const res = await request(app).get('/api/todos');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
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
