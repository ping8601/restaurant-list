const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sorting = require('../../utilities/sort')

// show all restaurants
router.get('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .then(restaurants => { res.render('index', { restaurants }) })
    .catch(error => console.error(error))
})

// search restaurant
router.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim()
  const keywordForRegex = new RegExp(keyword, 'i')
  const userId = req.user._id
  const sortingType = req.query.sortingType
  const typeObject = {
    isOne: sortingType === '1',
    isTwo: sortingType === '2',
    isThree: sortingType === '3',
    isFour: sortingType === '4'
  }

  return Restaurant.find({
      $and: [
          { $or: [{ name: keywordForRegex }, { category: keywordForRegex }] },
          { userId }
      ]})
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
