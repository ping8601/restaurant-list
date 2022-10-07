// require express 
const express = require('express')
const app = express()
const port = 3000;

// require mongoose
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

// require express-handlebars
const exphbs = require('express-handlebars');
const restaurant = require('./models/restaurant');

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

// use body-parser to refine all request
app.use(express.urlencoded({ extended: true }))

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static files
app.use(express.static('public'))

// set routes
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => { res.render('index', { restaurants }) })
    .catch(error => console.error(error))
})

app.post('/restaurants', (req, res) => {
  return Restaurant.create({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }

  const keyword = req.query.keyword.trim()
  const keywordForRegex = eval("/" + keyword + "/i"); 
  
  return Restaurant.find({$or : [{ "name": keywordForRegex}, {"category": keywordForRegex }]})
    .lean()
    .then((restaurants) => {
      let message = ""
      if (restaurants.length === 0) {
        message = '找不到結果，請嘗試不同關鍵字！'
      }
      return res.render('index', {restaurants, keyword, message})
    }).catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Express is now listening on localhost:${port}`)
})