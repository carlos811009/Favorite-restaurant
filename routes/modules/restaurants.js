const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurants-model.js')

router.get('/:id/detail', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurant => {
      res.render('detail', { restaurant })
    })
    .catch(error => console.log(error))

})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return RestaurantList.find()
    .lean()
    .then(restaurant => {
      const rearchList = restaurant.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurant: rearchList })
    })
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurant => {
      res.render('edit', { restaurant })
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const { name, phone, category, rating, location, description } = req.body
  const image = "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5632/06.jpg"
  const userId = req.user._id
  const newItem = {
    name: name,
    phone: phone,
    category: category,
    rating: rating,
    location: location,
    description: description,
    image: image,
    userId: userId
  }

  return RestaurantList.create(newItem)
    .then(() => console.log(`${name}餐廳，新增完成`))
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//各自餐廳還是有_id 不用特別在findOne(userId)
router.put('/:id', (req, res) => {
  const id = req.params.id
  console.log('3333')
  const { name, phone, category, rating, location, description } = req.body
  const image = 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5632/06.jpg'
  return RestaurantList.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.phone = phone
      restaurant.category = category
      restaurant.rating = rating
      restaurant.location = location
      restaurant.description = description
      restaurant.image = image
      return restaurant.save()
    })
    .then((restaurant) => res.redirect(`/restaurants/${id}/detail`))
    .catch(error => console.log(error))
})


router.delete('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})




module.exports = router