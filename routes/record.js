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
  console.log(req.body)
  const record = Record({
    name: req.body.billname,
    category: req.body.billcategory,
    date: req.body.billdate,
    amount: req.body.billamount

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

router.post('/:id/edit', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    console.log(req.params.id)
    if (err) return console.error(err)
    record.name = req.body.name
    record.category = req.body.category
    record.amount = req.body.amount
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/`)
    })
  })
})

router.post('/:id/delete', (req, res) => {
  Report.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router