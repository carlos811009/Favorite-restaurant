const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const RestaurantList = require('/Users/carlos/Desktop/ac_exercise/Restaurant-website/models/restaurants-model.js')
const exphbs = require('express-handlebars')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({ extended: true }))
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
  RestaurantList.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
  // res.render('index', { restaurant })
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

app.post('/restaurant', (req, res) => {
  const name = req.body.name
  const phone = req.body.phone
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const image = 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5632/06.jpg'
  const newItem = {
    name: name,
    phone: phone,
    category: category,
    rating: rating,
    location: location,
    image: image
  }
  return RestaurantList.create(newItem)
    .then(() => console.log(`${name}新增完成`))
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  RestaurantList.findById(id)
    .lean()
    .then(item => { item })
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log('ok')
})