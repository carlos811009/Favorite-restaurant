const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const reastaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Restaurants')
//difine the engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

//set engine
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { reastaurant: reastaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const item = reastaurantList.results.find(item => item.id === Number(req.params.id))
  console.log(item)
  res.render('show', { item })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const searchItem = reastaurantList.results.filter(item => item.name.includes(keyword))
  res.render('index', { reastaurant: searchItem })
})

app.listen(port, () => {
  console.log('ok')
})