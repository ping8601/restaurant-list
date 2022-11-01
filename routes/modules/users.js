const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logged out!')
  return res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'Email, password and confirm password are required fields!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Passwords mismatch, please check again.'})
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      password,
      confirmPassword
  })}
  User.findOne({ email })
  .then(user => {
    errors.push({ message: 'This email is already registerd!' })
    if (user) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      req.flash('success', 'You have successfullly registerd.')
      return User.create({
        name: name ? name : email.substring(0, email.indexOf('@')),
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(error => console.error)
    }
  }) 
})

module.exports = router