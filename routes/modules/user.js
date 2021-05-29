const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')


router.get('/login', (req, res) => {
  res.render('login')
})


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/restaurants/user/login'
}))

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '成功登出！')
  res.redirect('/user/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password) {
    errors.push('請完整填寫欄位！')
  }
  if (password !== confirmPassword) {
    errors.push('請確認密碼須一致！')
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push('此帳號已經註冊了！')
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
      }
    })
    .catch(err => console.log(err))

})
module.exports = router