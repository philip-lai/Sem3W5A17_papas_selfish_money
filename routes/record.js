// routes/home.js
const express = require('express')
const router = express.Router()
// const passport = require('passport')
// const bcrypt = require('bcryptjs')
const Record = require('../models/record')

// 載入 auth middleware裡的authenticated方法
// const { authenticated } = require('../config/auth')

// 新增一筆記帳頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增一筆記帳
router.post('/new', (req, res) => {
  let icon
  console.log(req.body)
  if (req.body.billcategory === "traffic") {
    icon = "-shuttle-van"
  } else if (req.body.billcategory === "house") {
    icon = "-home"
  } else if (req.body.billcategory === "entertainment") {
    icon = "-grin-beam"
  } else if (req.body.billcategory === "food") {
    icon = "-utensils"
  } else if (req.body.billcategory === "others") {
    icon = "-pen"
  }
  const record = Record({
    name: req.body.billname,
    category: req.body.billcategory,
    date: req.body.billdate,
    amount: req.body.billamount,
    icons: icon
    // userId: req.user._id
  })
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

router.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { record: record })
  })
})

router.put('/:id/edit', (req, res) => {
  let icon
  if (req.body.billcategory === "traffic") {
    icon = "-shuttle-van"
  } else if (req.body.billcategory === "house") {
    icon = "-home"
  } else if (req.body.billcategory === "entertainment") {
    icon = "-grin-beam"
  } else if (req.body.billcategory === "food") {
    icon = "-utensils"
  } else if (req.body.billcategory === "others") {
    icon = "-pen"
  }

  Record.findById(req.params.id, (err, record) => {
    console.log(req.params.id)
    if (err) return console.error(err)
    record.name = req.body.billname
    record.category = req.body.billcategory
    record.date = req.body.billdate
    record.amount = req.body.billamount
    record.icons = icon
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/`)
    })
  })
})

router.delete('/:id/delete', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router