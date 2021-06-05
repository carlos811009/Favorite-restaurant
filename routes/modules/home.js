const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurants-model.js')

router.get('/', (req, res) => {
  const userId = req.user._id
  RestaurantList.find({ userId })
    .lean()
    .sort({ _id: 'asc' })//正序排列 desc反序
    .then(restaurant => res.render('index', { restaurant }))
})

module.exports = router