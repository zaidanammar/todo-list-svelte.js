const {Todo} = require('../models')

class TodoController {
    static async getTodo(req, res, next) {
        try {
            const data = await Todo.findAll({
                order: [['id', 'asc']],
                where: {
                    UserId : req.loggedInUser.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createTodo(req, res, next) {
        try {
            const {title, description, status, due_date} = req.body
            const UserId = req.loggedInUser.id
            const data = await Todo.create({title, description, status, due_date, UserId})
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async findTodoById (req, res, next) {
        try {
            const id = +req.params.id
            const data = await Todo.findByPk(id)

            if (!data) {
                throw ({
                    status: 404,
                    message: "Todo Not Found!"
                })
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static async editTodo (req, res, next) {
        try {
            const id = +req.params.id
            const editedTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const data = await Todo.update(editedTodo, {
                where: {id},
                returning: true
            })
            if(!data[1].length) {
                throw({
                    status: 404,
                    message: "Todo Not Found!"
                })
            } else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            next(error)
        }
    }

    static async patchTodo (req, res, next) {
        try {
            const id = +req.params.id
            const status = {status: req.body.status}

            const data = await Todo.update(status, {
                where: {id},
                returning: true
            })
            if (!data[1].length) {
                throw({
                    status: 404,
                    message: "Data Not Found!"
                })
            } else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteTodo (req, res, next) {
        try {
            const id = +req.params.id
            const data = await Todo.destroy({
                where: {id}
            })
            if (!data) {
                throw ({
                    status: 404,
                    message: "Data not found!"
                })
            } else {
                res.status(200).json({message: 'Todo success to delete'})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TodoController