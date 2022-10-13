const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// show all restaurants
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => { res.render('index', { restaurants }) })
    .catch(error => console.error(error))
})

// search restaurant
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }

  const keyword = req.query.keyword.trim()
  const keywordForRegex = eval('/' + keyword + '/i')

  return Restaurant.find({ $or: [{ name: keywordForRegex }, { category: keywordForRegex }] })
    .lean()
    .then((restaurants) => {
      let message = ''
      if (restaurants.length === 0) {
        message = '找不到結果，請嘗試不同關鍵字！'
      }
      return res.render('index', { restaurants, keyword, message })
    }).catch(error => console.error(error))
})

module.exports = router
