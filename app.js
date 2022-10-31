// require required modules and packages
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

const routes = require('./routes')
const usePassport = require('./config/passport')
const passport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = 3000

// use body-parser to refine all request
app.use(express.urlencoded({ extended: true }))

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// set static files
app.use(express.static('public'))

// use method-override
app.use(methodOverride('_method'))

// use session
app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))

// use passport
usePassport(app)

// add a middleware to add variables for view engine
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// set routes
app.use(routes)

app.listen(port, () => {
  console.log(`Express is now listening on localhost:${port}`)
})
