const express = require('express')
const database = require('./config/database.js')
require('dotenv').config();
const app = express()
const port = process.env.PORT

database.connect()
const route = require('./routes/client/index.route.js')


// cấu hình file tĩnh (chia sẻ đc ra bên ngoài)
app.use(express.static('public'))

// nếu đoạn này được thực thi thì nó sẽ chạy trước, cái route(app) đằng sau k đc thực thi nữa
// app.set('views', './views')
// app.set('view engine', 'pug')

// app.get('/', (req, res) => {
//   res.render('client/pages/home/index')
// })

// app.get('/products', (req, res) => {
//   res.render('client/pages/products/product')
// })

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})