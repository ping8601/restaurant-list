const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrtegy = require('passport-facebook').Strategy

const User = require('../models/user')

module.exports = app => {
  // initialize passport module
  app.use(passport.initialize())
  app.use(passport.session())
  // set local strategy
  passport.use(new LocalStrategy( { usernameField: 'email'}, 
    (email, password, done) => {
      User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'The email is not registered!'})
        }
        if (user.password !== password) {
          return done(null, false, {message: 'Email or password incorrect!'})
        }
        return done(null, user)
      })
      .catch(error => done(error, false))
    }))
  // set serialize and deserialize
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, false))
  })
}


