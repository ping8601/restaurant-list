// require packages
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')

// require restaurant.js
const restaurants = require('../restaurant.json').results

// link to mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// check database connection
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
  Restaurant.create(restaurants)
    .then(() => console.log('Restaurant seeder done!'))
    .catch(error => console.error(error))
    .finally(() => db.close())
})


