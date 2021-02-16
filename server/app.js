if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const ErrorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routes)
app.use(ErrorHandler.handle)

module.exports = app