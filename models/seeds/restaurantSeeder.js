// require packages & data
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const User = require('../user')
const Restaurant = require('../restaurant')
const restaurants = require('../restaurant.json').results

const SeedUser = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}, {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]

db.once('open', () => {
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SeedUser[0].password, salt))
    .then(hash => User.create({
      name: SeedUser[0].name,
      email: SeedUser[0].email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      for (let i = 0; i < 3; i++) {
        restaurants[i].userId = userId
      }
      return Promise.all(Array.from(
        { length: 3 },
        (_, i) => Restaurant.create(restaurants[i])
      ))
    })
    .then(() => {
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(SeedUser[1].password, salt))
        .then(hash => User.create({
          name: SeedUser[1].name,
          email: SeedUser[1].email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          for (let i = 3; i < 6; i++) {
            restaurants[i].userId = userId
          }
          return Promise.all(Array.from(
            { length: 3 },
            (_, i) => Restaurant.create(restaurants[i + 3])
          ))
        })
        .then(() => {
          console.log('Done!')
          process.exit()
        })
    })
})
