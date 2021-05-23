const reastaurantJson = require('../../restaurant.json')
const RestaurantList = require('../restaurants-model.js')
const db = require('../../config/mongoose')

db.once('open', () => {
  reastaurantJson.results.forEach(item => {
    RestaurantList.create({
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