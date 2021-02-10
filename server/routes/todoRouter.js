const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authorization = require('../middleware/authorization')

router.get('/', TodoController.getTodo)
router.post('/', TodoController.createTodo)
router.get('/:id', authorization, TodoController.findTodoById)
router.put('/:id', authorization, TodoController.editTodo)
router.patch('/:id', authorization, TodoController.patchTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router