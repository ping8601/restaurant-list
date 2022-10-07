// require express 
const express = require('express')
const app = express()
const port = 3000;

// require mongoose
const mongoose = require('mongoose')

// require express-handlebars
const exphbs = require('express-handlebars')

// require restaurant.json
const restaurants = require('./restaurant.json').results

// link to mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// check database connection
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected!')
})

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static files
app.use(express.static('public'))

// set routes
app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(restaurant => restaurant.id === Number(req.params.id))
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }

  const keyword = req.query.keyword.trim()
  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
    restaurant.category.toLowerCase().includes(keyword.toLowerCase()))

  let message = ""
  if (filteredRestaurants.length === 0) {
    message = '找不到結果，請嘗試不同關鍵字！'
  }
  res.render('index', { restaurants: filteredRestaurants, keyword, message })
})



app.listen(port, () => {
  console.log(`Express is now listening on localhost:${port}`)
})