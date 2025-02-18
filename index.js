const express = require('express')
const app = express();
const port = 3000;
const route = require('./routes/client/index.route.js')


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