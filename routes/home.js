// routes/home.js
const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 載入 auth middleware裡的authenticated方法
// const { authenticated } = require('../config/auth')

// 設定首頁路由器
//加入authenticated驗證
router.get('/', (req, res) => {
  Record.find((err, records) => {
    if (err) return console.error(err)
    return res.render('index', { records: records })
  })
})

module.exports = router

