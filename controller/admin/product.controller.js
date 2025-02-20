
// lấy data
const Product = require('../../models/product.model.js')



// GET /admin/products
module.exports.product = async (req, res) => {
  const products = await Product.find({
    deleted: false
  })

  const newProducts = products.map(item => {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed()
    return item;
  })

  res.render('admin/pages/products/index.pug',
    {
      pageTitle: 'Products',
      products: newProducts
    }
  )
}