const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const user = require('./modules/user')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/restaurants', user)

module.exports = router