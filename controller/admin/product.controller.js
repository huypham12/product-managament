
// lấy data
const Product = require('../../models/product.model.js')
const filterStatusHelper = require('../../helper/filterStatus.js')
const searchHelper = require('../../helper/seach.js')
const Pagination = require('../../helper/pagination.js')
// GET /admin/products
module.exports.product = async (req, res) => {

  let find = {
    deleted: false
  }

  // lọc với điều kiện của hàm search
  find = searchHelper(req.query, find)

  // biến này sau đó được render ra file 'admin/pages/products/index.pug', nó sẽ được dùng ở đây
  const filterStatus = filterStatusHelper(req.query)

  //pagination
  const countProducts = await Product.countDocuments(find) // lấy data theo đk
  let objectPagination = Pagination(req.query, countProducts, {
    currentPage: 1,
    limitItem: 4, // giới hạn số sp của 1 trang
  })
  //end pagination

  // lọc ra các sản phẩm cho 1 trang, limit là số sp tối đa trên trang đó, skip là bỏ qua bao nhiêu phần tử trc đó trong db
  // skip bỏ qua n tài liệu trước đó nên không thể nhận giá trị âm, ví dụ tổng chỉ có 10 trang nhưng m đag ở trang thứ 11
  // thì skip là 11-1 * limit theo công thức thì sẽ bỏ qua hết các sp nên trang trống, tuy nhiên nếu m đag ở trang 0 thì skip 
  // theo công thức sẽ bị âm nên k thể tồn tại trang 0. đm lú lù lu, phải hiểu các hàm nó chạy như nào mới code mượt đc
  const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip)

  const newProducts = products.map(item => {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed()
    return item;
  })


  // xuất ra giao diện, những biến trong này có thể dùng đc ở file pug bên dưới
  res.render('admin/pages/products/index.pug',
    {
      pageTitle: 'Products',
      products: newProducts,
      filterStatus: filterStatus,
      keyword: req.query.keyword, // cái keyword này đc lấy từ ô input của thanh tìm kiếm, đọc code ở file script sẽ thấy
      pagigation: objectPagination
    }
  )
}