module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Please login to continue!')
    return res.redirect('/users/login')
  }
}
