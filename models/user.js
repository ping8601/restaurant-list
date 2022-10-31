const { text } = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.Now 
  }
})

module.exports = mongoose.model('User', userSchema)