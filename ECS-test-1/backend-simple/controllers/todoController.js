let todos = []
let id = 0
const getTodos = (req, res) => {
    console.log('Inside get Todos')
    res.json({ data: todos });
};

const getTodoById = (req, res) => {
    try {
        console.log('Find todo for id', req.params.id)

        const filteredTodo = todos.find(todo => {
            return todo._id == req.params.id
        })

        if (!filteredTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(filteredTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Todo', error: error.message });
    }
};

const createTodo = (req, res) => {
    const todo = req.body;
    const createdTodo = { ...todo, _id: id++ }
    console.log('Creating todo', createdTodo)
    todos.push(createdTodo)
    res.status(201).json(createdTodo);
};

const deleteTodo = (req, res) => {
    console.log('Deleting todo', req.params.id)
    todos = todos.filter(todo => todo._id != req.params.id)
    res.sendStatus(204);
};

const updateTodo = (req, res) => {
    try {
        console.log('Updating todo', req.params.id)
        console.log('Body', req.body)
        const todoIdx = todos.findIndex(todo => todo._id == req.params.id)

        if (todoIdx === -1) {
            res.status(404).json({ message: 'Todo not found' });
            return
        }

        todos[todoIdx] = { ...todos[todoIdx], ...req.body }
        res.json(req.body);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update todo', error: err.message });
    }
};

module.exports = { getTodos, createTodo, deleteTodo, updateTodo, getTodoById }