const ProductCategory = require('../../models/product-category.model')


const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() });

// CONFIG CLOUDINARY
cloudinary.config({
  cloud_name: 'dol6rg6uv',
  api_key: '826667749224898',
  api_secret: 'korR1pGCAhpRBQSLkHA0r2RZRJg' // Click 'View API Keys' above to copy your API secret
});

async function uploadImage(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'samples', // Optional: specify the folder to store images
    });
    console.log('Image uploaded successfully:', result.url);
    return result.url;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}
// link config https://dev.to/devops_den/how-to-integrate-cloudinary-in-nodejs-37a9?utm_source=chatgpt.com
// END CONFIG CLOUDINARY



// GET /admin/products-category
module.exports.productCategory = async (req, res) => {
  let find = {
    deleted: false
  }


  const records = await ProductCategory.find(find)

  // xuất ra giao diện, những biến trong này có thể dùng đc ở file pug bên dưới
  // server response về cho client
  res.render('admin/pages/product-category/index.pug',
    {
      pageTitle: 'Products Category',
      records: records
    }
  )
}

module.exports.create = async (req, res) => {
  res.render('admin/pages/product-category/create.pug',
    {
      pageTitle: 'Create',
    }
  )
}

// [POST] CREATE PRODUCT /admin/products/create
module.exports.createPost = async (req, res) => {

  if (req.body.position == '') {
    const countProducts = await ProductCategory.countDocuments()
    req.body.position = countProducts + 1
  } else {
    req.body.position = parseInt(req.body.position)
  }

  if (req.file) {
    console.log(req.file)
    try {
      const imagePath = req.file.path;
      const imageUrl = await uploadImage(imagePath);
      req.body[req.file.fieldname] = imageUrl
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  }
  const productCategory = new ProductCategory(req.body)
  await productCategory.save()

  req.flash('success', 'thêm sp thành công')
  res.redirect('back')
}
// END CREATE PRODUCT

