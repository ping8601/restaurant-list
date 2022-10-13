// require packages & data
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurants = require('../restaurant.json').results

db.once('open', () => {
  Restaurant.create(restaurants)
    .then(() => console.log('Restaurant seeder done!'))
    .catch(error => console.error(error))
    .finally(() => db.close())
})
