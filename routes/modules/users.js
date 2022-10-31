const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password }  = req.body
  User.findOne({ email })
  .then(user => {
    if (!user) {
      return res.render('login')
    }
  })
  .then()
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword } = req.body
  User.findOne({ email })
  .then(user => {
    if (user) {
      console.log('User already exists.')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(error => console.error)
    }
  }) 
})

module.exports = router