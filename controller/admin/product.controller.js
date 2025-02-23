
// lấy data
const Product = require('../../models/product.model.js')
const filterStatusHelper = require('../../helper/filterStatus.js')


// GET /admin/products
module.exports.product = async (req, res) => {
  let find = {
    deleted: false
  }

  // nếu cái query nó có status thì sẽ thêm cái status đấy vào hàm find để lọc
  if (req.query.status) {
    find.status = req.query.status
  }


  // Tìm kiếm theo từ khóa (title chứa từ khóa)
  if (req.query.keyword) {
    find.title = { $regex: req.query.keyword, $options: 'i' }; // lấy những title có chứa keyword
  }

  const filterStatus = filterStatusHelper(req.query)


  console.log(req.query.status)
  const products = await Product.find(find)

  const newProducts = products.map(item => {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed()
    return item;
  })


  // xuất ra giao diện
  res.render('admin/pages/products/index.pug',
    {
      pageTitle: 'Products',
      products: newProducts,
      filterStatus: filterStatus,
      keyword: req.query.keyword
    }
  )
}