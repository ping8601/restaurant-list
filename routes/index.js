const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

router.use('/users', users)
router.use('/restaurants', restaurants)
router.use('/', home)

module.exports = router
