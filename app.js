const express = require('express')
const app = express()
const mongoose = require('mongoose')
// 加上 { useNewUrlParser: true }
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/moneybook', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const Record = require('./models/record')
const User = require('./models/user')

// 設定第一個首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})