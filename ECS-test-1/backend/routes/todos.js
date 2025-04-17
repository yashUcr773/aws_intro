const express = require('express');
const { createTodo, deleteTodo, getTodos, updateTodo, getTodoById } = require("../controllers/todoController");

const router = express.Router();

router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
