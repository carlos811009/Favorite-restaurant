const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const reastaurantJson = require('../../restaurant')
const RestaurantList = require('../restaurants-model')
const db = require('../../config/mongoose')
const User = require('../user')


const seed_user = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "12345678"
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678"
  }
]

db.once('open', () => {
  seed_user.forEach((seedUser, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => RestaurantList.create(
            {
              ...reastaurantJson.results[(i + (index * 3))], userId
            })
        ))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })
})