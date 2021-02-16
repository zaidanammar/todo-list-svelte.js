class ErrorHandler {
    static handle (err, req, res, next) {
        let status = err.status || 500
        let msg = err.message || 'Internal Server Error'

        if (err.name === 'Validation Error') {
            const messages = err.message.map(e => e.message)
            res.status(err.status).json({messages})
        } else if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            msg = err.errors.map(e => {
                return e.message
            })
            msg = msg.join(', ')
            status = 400
        } else if (err.name === 'WrongEmailPassword') {
            msg = 'email/password incorrect'
            status = 401
        }
        res.status(status).json({message: msg})
    }
}

module.exports = ErrorHandler