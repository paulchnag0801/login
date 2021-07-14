const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const routes = require('./routes')

require('./config/mongoose')
// 取得資料庫連線狀態


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.get('/', (req, res) => {
  res.render('login')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
