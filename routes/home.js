// routes/home.js
const express = require('express')
const router = express.Router()
const Record = require('../models/record')
// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require('../config/auth')

// 載入 auth middleware裡的authenticated方法
// const { authenticated } = require('../config/auth')

// 設定首頁路由器
//加入authenticated驗證
router.get('/', authenticated, (req, res) => {
  const choosenCategory = req.query.category
  let totalAmount = 0
  console.log(choosenCategory)
  if (choosenCategory === "all" || choosenCategory === undefined) {
    Record.find({ userId: req.user._id })            // 只會列出登入使用者的 todo
      .exec((err, records) => {
        if (err) return console.error(err)
        for (let i in records) {
          totalAmount += records[i].amount
        }
        return res.render('index', { records: records, totalAmount })
      })
  } else {
    Record.find({ userId: req.user._id, category: choosenCategory })            // 只會列出登入使用者的 todo
      .exec((err, records) => {
        if (err) return console.error(err)
        for (let i in records) {
          totalAmount += records[i].amount
        }
        return res.render('index', { records: records })
      })
  }

})

module.exports = router

