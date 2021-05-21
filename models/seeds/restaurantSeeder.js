const reastaurantList = require('/Users/carlos/Desktop/ac_exercise/Restaurant-website/restaurant.json')
const RestaurantList = require('/Users/carlos/Desktop/ac_exercise/Restaurant-website/models/restaurants-model.js')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongdb error')
})

db.once('open', () => {
  console.log('mongodb connected')
  reastaurantList.results.forEach(item => {
    restaurantlists.create({
      "name": item.name,
      "name_en": item.name_en,
      "category": item.category,
      "image": item.image,
      "location": item.location,
      "phone": item.phone,
      "google_map": item.google_map,
      "rating": item.rating,
      "description": item.description,
    })
  })
  console.log('done')
})