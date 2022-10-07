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
  restaurants.forEach(restaurant => {
    Restaurant.create({
      name: restaurant.name, 
      name_en: restaurant.name_en,
      category: restaurant.category, 
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone, 
      google_map: restaurant.google_map, 
      rating: restaurant.rating, 
      description: restaurant.description
    })
  })
})