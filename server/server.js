if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(port, () => console.log(`this app running on PORT ${port}`))