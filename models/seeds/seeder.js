const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const bcrypt = require('bcryptjs')
const recordlist = require('../record.json').results
const userlist = require('../users.json').users

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/moneybook', { useNewUrlParser: true, useUnifiedTopology: true })

// mongoose 連線後透過mongoose.connection拿到Connection的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('db connected')
  for (let i = 0; i < userlist.length; i++) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userlist[i].password, salt, (err, hash) => {
        const newUser = new User({
          name: userlist[i].name,
          email: userlist[i].email,
          password: hash
        })
        newUser.save().then(user => {
          // create restaurant data for each user
          for (let j = i * 6; j < (i + 1) * 6; j++) {
            console.log(recordlist[j].category)
            let icon
            if (recordlist[j].category === "traffic") {
              icon = "-shuttle-van"
            } else if (recordlist[j].category === "house") {
              icon = "-home"
            } else if (recordlist[j].category === "entertainment") {
              icon = "-grin-beam"
            } else if (recordlist[j].category === "food") {
              icon = "-utensils"
            } else if (recordlist[j].category === "others") {
              icon = "-pen"
            }
            Record.create({
              name: recordlist[j].name,
              category: recordlist[j].category,
              date: recordlist[j].date,
              amount: recordlist[j].amount,
              icons: icon,
              userId: user._id
            })
          }
        }).catch(err => {
          console.log(err)
        })
      })
    })
  }
  console.log('done')
})
