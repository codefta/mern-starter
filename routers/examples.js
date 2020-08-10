const router = require('express').Router()
const exampleService = require('../services/exampleService')

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json()
  } catch (err) {
    next(err)
  }
})

module.exports = router
