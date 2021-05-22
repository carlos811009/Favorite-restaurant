const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const exphbs = require('express-handlebars')
const routes = require('./routes/index')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongdb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)
//difine the engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

//set engine
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))

app.use(express.static('public'))



app.listen(port, () => {
  console.log('ok')
})