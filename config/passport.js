const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize()) //初始化
  app.use(passport.session()) //存入session

  //套用LocalStrategy,usernameField是官方設定,最後必須為done
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

    //從資料庫找email
    User.findOne({ email })
      .then(user => {
        //沒有表示不存在
        if (!user) {
          return done(null, false, { message: 'This email is not regitstered!' })
        }
        //判別password 使否與資料庫一樣
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'Check your email and password are correct!' })
            }
            //都正確回傳user
            return done(null, user)
          })

      })
      .catch(err => done(err, false))
  }))
  //序列化 找 ＩＤ
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  //反序列找user全部資料
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}

