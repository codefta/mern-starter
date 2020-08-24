const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

// import routers

mongoose
  .connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongodb connected')
  })
  .catch((err) => {
    console.log('mongodb error: ' + err.message)
  })

app.use(
  middleware.morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
)

app.use(helmet())
app.use(express.json())
app.use(middleware.tokenExtractor())

// Routers

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
