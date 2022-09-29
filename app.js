// require express 
const express = require('express')
const app = express();
const port = 3000;

// require express-handlebars
const exphbs = require('express-handlebars')

// require restaurant.json
const restaurants = require('./restaurant.json').results

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static files
app.use(express.static('public'))

// set routes
app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(restaurant => restaurant.id == Number(req.params.id))
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const filteredRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  const keyword = req.query.keyword
  let message = ""
  if (filteredRestaurants.length == 0) {
    message = "找不到結果，請嘗試不同關鍵字！"
  }
  res.render('index', { restaurants: filteredRestaurants, keyword, message })
})

app.listen(port, () => {
  console.log(`Express is now listening on localhost:${port}`)
})