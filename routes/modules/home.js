const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurants-model.js')

router.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
  // res.render('index', { restaurant })
})

module.exports = router