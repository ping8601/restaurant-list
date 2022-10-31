const express = require('express')
const router = express.Router()

const users = require('./modules/users')
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.use('/', authenticator, home)

module.exports = router
