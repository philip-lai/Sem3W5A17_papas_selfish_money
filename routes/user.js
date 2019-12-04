// routes/home.js
const express = require('express')
const router = express.Router()
// const passport = require('passport')
// const bcrypt = require('bcryptjs')
const User = require('../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

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
      newUser
        .save()
        .then(user => { res.redirect('/') })
        .catch(err => console.log(err))

    }
  })
  //res.send('register')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router

