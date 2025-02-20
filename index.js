const express = require('express') // sử dụng express vì framework này đã cấu hình route,... cho ăn sẵn:)
const database = require('./config/database.js')
require('dotenv').config();

const systemconfig = require('./config/system.js')
const app = express()
const port = process.env.PORT

database.connect()
const routeClient = require('./routes/client/index.route.js')
const routeAdmin = require('./routes/admin/index.route.js')

// app locals variable
// dùng được ở all file pug
app.locals.prefixAdmin = systemconfig.prefixAdmin

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

routeClient(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})