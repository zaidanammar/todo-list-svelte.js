const router = require('express').Router()
const todoRouter = require('./todoRouter') 
const userController = require('../controllers/userController')
const authentication = require('../middleware/authentication')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.use('/todos', authentication, todoRouter)

module.exports = router