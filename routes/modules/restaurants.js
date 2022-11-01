const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// add new restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({
    name,
    category,
    image: image ? image : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png',
    location,
    phone,
    google_map,
    rating,
    description,
    userId: req.user._id
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// edit restaurant
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.image = image ? image : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.error(error))
})

// view restaurant
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

// delete restaurant
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      if (restaurant!= null) {
        return restaurant.remove()
      }
      }).then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
