const Product = require('../../models/product.model')


// method này là để render ra giao diện
module.exports.trash = async (req, res) => {
  const products = await Product.find({ deleted: true })

  res.render('admin/pages/trash/trash.pug',
    {
      products: products
    }
  )
}

// method này là để khôi phục sp
module.exports.restore = async (req, res) => {
  const id = req.params.id
  console.log(id)

  await Product.updateOne
    (
      { _id: id },
      { deleted: false }
    )
  res.redirect(req.get("Referrer") || "/")
}


// method này là để xóa vĩnh viễn
module.exports.delete = async (req, res) => {
  const id = req.params.id
  console.log(id)
  await Product.deleteOne(
    { _id: id }
  )
  res.redirect(req.get("Referrer") || "/")
}
