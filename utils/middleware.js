const morgan = require('morgan')

morgan.token('body', (req, res) => {
  if (req.method === 'post' || req.method === 'put') {
    return JSON.stringify(req.body)
  }
})

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebToken') {
    res.status(400).json({ error: 'invalid token' })
  }

  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  } else {
    req.token = null
  }

  next()
}

module.exports = {
  morgan,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}
