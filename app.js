const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const RestaurantList = require('/Users/carlos/Desktop/ac_exercise/Restaurant-website/models/restaurants-model.js')
const exphbs = require('express-handlebars')
mongoose.connect('mongodb://localhost/Restaurant-website', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongdb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})
//difine the engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

//set engine
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  RestaurantList.find({})
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
})

app.get('/restaurants/:id/detail', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurant => {
      res.render('detail', { restaurant })
    })
    .catch(error => console.log(error))

})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()

  return RestaurantList.find()
    .lean()
    .then(restaurant => {
      const rearchList = restaurant.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurant: rearchList })
    })
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('ok')
})