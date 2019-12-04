const express = require('express')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()
const mongoose = require('mongoose')
// 加上 { useNewUrlParser: true }
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/moneybook', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
const Record = require('./models/record')
const User = require('./models/user')
// 引用 express-handlebars
const exphbs = require('express-handlebars');
// 引用 body-parser
const bodyParser = require('body-parser');
// 引用 method-override
const methodOverride = require('method-override')

const session = require('express-session')
const passport = require('passport')


// 告訴 express 使用 handlebars 當作 template engine 並預設 layout 是 main
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'your secret key',   // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true,
}))
// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// 設定 method-override
app.use(methodOverride('_method'))

// setting static files
app.use(express.static('public'))




db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})



app.use('/', require('./routes/home'))
app.use('/record', require('./routes/record'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})