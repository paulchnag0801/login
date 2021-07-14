const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const app = express()

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true,
  })
)
app.use(express.urlencoded({ extended: true }))
usePassport(app)
app.use(routes)

app.get('/', (req, res) => {
  res.render('login')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
