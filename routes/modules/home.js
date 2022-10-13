const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sorting = require('../../utilities/sort')

// show all restaurants
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => { res.render('index', { restaurants }) })
    .catch(error => console.error(error))
})

// search restaurant
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const keywordForRegex = eval('/' + keyword + '/i')
  const sortingType = req.query.sortingType
  const typeObject = {
    isOne: sortingType === '1',
    isTwo: sortingType === '2',
    isThree: sortingType === '3',
    isFour: sortingType === '4'
  }

  if (!req.query.keyword) {
    return Restaurant.find()
      .lean()
      .sort(sorting(sortingType))
      .then((restaurants) => {
        return res.render('index', { restaurants, keyword, typeObject })
      }).catch(error => console.error(error))
  }

  return Restaurant.find({ $or: [{ name: keywordForRegex }, { category: keywordForRegex }] })
    .lean()
    .sort(sorting(sortingType))
    .then((restaurants) => {
      let message = ''
      if (restaurants.length === 0) {
        message = '找不到結果，請嘗試不同關鍵字！'
      }
      return res.render('index', { restaurants, keyword, message, typeObject })
    }).catch(error => console.error(error))
})

module.exports = router
