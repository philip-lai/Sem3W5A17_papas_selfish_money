// routes/home.js
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  // 使用 passport 認證
  passport.authenticate('local', {
    // 登入成功會回到根目錄
    successRedirect: '/',
    // 失敗會留在登入頁面
    failureRedirect: '/users/login'
  })(req, res, next)
  // res.send('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log('user already exiests')
      res.render('register', {
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = new User({
        name,
        email,
        password
      })

      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => { res.redirect('/') })
            .catch(err => console.log(err))
        })
      )
    }
  })
  //res.send('register')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router

