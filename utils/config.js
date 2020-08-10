require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const NODE_ENV = process.env.NODE_ENV
const JWT_SECRET = process.env.JWT_SECRET

if (NODE_ENV === 'testing') {
  MONGODB_URI = process.env.MONGODB_URI_TEST
}

module.exports = { PORT, MONGODB_URI, MONGODB_URI_TEST, JWT_SECRET }
