
// lấy data
const Product = require('../../models/product.model.js')
const filterStatusHelper = require('../../helper/filterStatus.js')
const seachHelper = require('../../helper/seach.js')

// GET /admin/products
module.exports.product = async (req, res) => {

  const find = seachHelper(req.query)
  const filterStatus = filterStatusHelper(req.query)


  console.log(req.query.status)
  const products = await Product.find(find)

  const newProducts = products.map(item => {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed()
    return item;
  })


  // xuất ra giao diện, những biến trong này có thể dùng đc ở các file pug
  res.render('admin/pages/products/index.pug',
    {
      pageTitle: 'Products',
      products: newProducts,
      filterStatus: filterStatus,
      keyword: req.query.keyword
    }
  )
}