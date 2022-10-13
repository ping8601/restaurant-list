const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// add new restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  return Restaurant.create({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image ? req.body.image : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png',
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// edit restaurant
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.category = req.body.category
      restaurant.image = req.body.image ? req.body.image : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

// view restaurant
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

// delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
