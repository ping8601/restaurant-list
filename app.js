// require required modules and packages
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')
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

// set routes
app.use(routes)

app.listen(port, () => {
  console.log(`Express is now listening on localhost:${port}`)
})
