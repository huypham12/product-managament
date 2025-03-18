
const Product = require('../../../models/product.model.js')


// GET /products
// khi cái route chạy thì nó yêu cầu controller lấy data từ db ra 
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: 'active'
  }).sort({ position: "asc" })

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

// GET product detail

module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug
    const item = await Product.findOne({ slug: slug })

    res.render('client/pages/products/detail.pug', {
      pageTitle: 'detail',
      item: item
    })
  }
  catch (error) {
    console.log(error)
    res.redirect('back')
  }
}