const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const exphbs = require('express-handlebars')
const routes = require('./routes/index')
require('./config/mongoose')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)


app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})