const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')

const port = process.env.PORT || 3000
require('./config/mongoose')


const usePassport = require('./config/passport')

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)



app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})