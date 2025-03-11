
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
  const products = await Product.find(find).sort({ position: "asc" }).limit(objectPagination.limitItem).skip(objectPagination.skip)

  const newProducts = products.map(item => {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed()
    return item;
  })


  // xuất ra giao diện, những biến trong này có thể dùng đc ở file pug bên dưới
  // server response về cho client
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


// change status
// khi click vào nút active hoặc inactive thì nó sẽ
// request db phải update lại từ active thành inactive hoặc
// ngược lại, khi click thì sẽ lấy được id và trạng thái
// hiện tại để làm đk tìm kiếm để update trên db
// ở route sẽ sử dụng patch vì patch an toàn hơn get khi 
// cập nhật dữ liệu, get chỉ lấy thôi
// ví dụ như m dùng get thì khi người dùng tự nhập cái 
// link đấy vào trình duyệt thì nghĩa là server hiểu 
// client đã yc cập nhật dữ liệu, như thế quá nguy hiểm
// vì trình duyệt mặc định chỉ hỗ trợ GET khi truyền link
// trực tiếp giống kiểu mấy cái thẻ <a> đều là GET hết
// còn PATCH thì kể cả có biết link thì cx k update đc db 
// vì trình duyệt k hỗ trợ

module.exports.changeStatus = async (req, res) => {
  const status = req.params.status
  const id = req.params.id // params dùng để lấy dữ liệu động từ url (mấy cái dạng như này :status/:id)


  //chờ để cập nhật lại dữ liệu
  await Product.updateOne
    (
      { _id: id },
      { status: status }
    )


  // thực ra là tới đoạn bên trên là db thay đổi rồi
  // còn đoạn này là để load lại trang cập nhật giao diện thôi
  req.flash("success", "cập nhật trạng thái thành công!")
  res.redirect(req.get("Referrer") || "/") // chuyển hướng luôn lại trang cũ
}

// end change status

// change multi

module.exports.changeMulti = async (req, res) => {
  const type = req.body.type
  const ids = req.body.ids.split(',')
  switch (type) {
    case 'active':
      await Product.updateMany(
        { _id: { $in: ids } },
        { status: 'active' }
      )
      break;
    case 'inactive':
      await Product.updateMany(
        { _id: { $in: ids } },
        { status: 'inactive' }
      )
      break
    case 'change-position':
      for (const item of ids) {
        let [id, position] = item.split("-")
        position = parseInt(position)
        await Product.updateOne(
          { _id: id },
          { position: position }
        )
      }
      break
    default:
      break;
  }

  req.flash("success", "cập nhật trạng thái thành công!")
  res.redirect(req.get("Referrer") || "/")
}

// end change multi


// delete item

module.exports.deleteItem = async (req, res) => {
  const id = req.params.id
  console.log(id)
  await Product.updateOne({ _id: id },
    {
      deleted: true,
      deletedAt: new Date()
    })

  req.flash("success", "xóa sản phẩm thành công!")
  res.redirect(req.get("Referrer") || "/")
}

// end delete item


// xóa nhiều
module.exports.deleteAll = async (req, res) => {
  const ids = req.body.ids.split(',')
  await Product.updateMany({ _id: { $in: ids } },
    {
      deleted: true,
      deletedAt: new Date()
    })

  req.flash("success", "xóa sản phẩm thành công!")
  res.redirect(req.get("Referrer") || "/")
}

// kết thúc xóa nhiều


// create a new product
// GET /admin/products/create
module.exports.create = async (req, res) => {
  res.render('admin/pages/products/create.pug',
    {
      pageTitle: "Create new product"
    })
}

module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price)
  req.body.stock = parseInt(req.body.stock)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  if (req.body.position == '') {
    const countProducts = await Product.countDocuments()
    req.body.position = countProducts + 1
  } else{
    req.body.position = parseInt(req.body.position)
  }
  const product = new Product(req.body)
  await product.save()

  res.redirect(req.get("Referrer") || "/")
}


// END create a new product