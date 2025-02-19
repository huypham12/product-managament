const Product = require('../../../models/product.model.js')



// khi cái route chạy thì nó yêu cầu controller lấy data từ db ra 
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: 'active',
    deleted: false
  })

  const newProducts = products.map(item => {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed()
    return item;
  })

  // các biến được render sẽ có thể sử dụng trong file pug bên dưới
  res.render('client/pages/products/product.pug', {
    pageTitle: 'Products',
    products: newProducts
  })
}