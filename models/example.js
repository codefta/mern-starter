const mongoose = require('mongoose')

// Add unique validator if you need it.
// const uniqueValidator = require('mongoose-unique-validator')

const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
})

// Add unique validator to schema
// schema.plugin(uniqueValidator)

schema.pre('save', (next) => {
  const now = new Date()

  this.modifiedAt = now

  if (!this.createdAt) {
    this.createdAt = now
  }

  next()
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Example', schema)
