const { Todo } = require('../models/Todo');
const { redisClient } = require('../config/redis');


const getTodos = async (req, res) => {
    const cached = await redisClient.get('todos');

    if (cached) {
        res.json({ source: 'cache', data: JSON.parse(cached) });
        return
    }

    const todos = await Todo.find();
    await redisClient.setEx('todos', 60, JSON.stringify(todos));
    res.json({ source: 'db', data: todos });
};

const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Todo', error: error.message });
    }
};

const createTodo = async (req, res) => {
    const todo = new Todo(req.body);
    await todo.save();
    await redisClient.del('todos'); // clear cache
    res.status(201).json(todo);
};

const deleteTodo = async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    await redisClient.del('todos');
    res.sendStatus(204);
};

const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedTodo) {
            res.status(404).json({ message: 'Todo not found' });
            return
        }

        await redisClient.del('todos');
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update todo', error: err.message });
    }
};

module.exports = { getTodos, createTodo, deleteTodo, updateTodo, getTodoById }