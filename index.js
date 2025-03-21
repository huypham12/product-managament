/*note

code theo kiểu csr (client side redering) là phía back end sẽ dùng nodejs gì đấy để viết logic xử lý dữ liệu, sau đó tạo ra api đưa cho font end redering thành giao diện với react js gì đấy. Còn code theo kiểu ssr thì là reder luôn trên server bằng pug gì đấy
project này đag code kiểu ssr nghĩa là gần như fullstack cmnr:)))

end note */

// cấu hình mongoDB luôn chạy
// sc config MongoDB start=auto


const express = require('express') // sử dụng express vì framework này đã cấu hình route,... cho ăn sẵn:)
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // giúp sử dụng được patch,... vì trình duyệt chỉ hỗ trợ get, post
const database = require('./config/database.js') // kết nối db
require('dotenv').config();
const path = require('path')



const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')


const systemconfig = require('./config/system.js')
const app = express()
app.use(cookieParser("kjete"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.use(methodOverride('_method'))
const port = process.env.PORT

// tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//Xử lý dữ liệu từ form (cho phép object, array phức tạp).
app.use(bodyParser.urlencoded({ extended: false }))

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