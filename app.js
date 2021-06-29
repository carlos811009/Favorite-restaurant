const express = require('express')
const app = express()
const methodOverride = require('method-override')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.PORT
require('./config/mongoose')


const usePassport = require('./config/passport')

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))


app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')

  next()
})

app.use(routes)



app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})