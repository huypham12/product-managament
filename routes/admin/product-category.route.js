const express = require('express')
const router = express.Router()
const multer = require('multer')
const storageMulter = require('../../helper/storage.Multer.js')
const upload = multer({ storage: storageMulter() })
const controller = require('../../controller/admin/product-category.controller.js')
const validate = require('../../validate/admin/product.validate.js')

router.get('/', controller.productCategory)
router.get('/create', controller.create)
router.post('/create',
  upload.single('thumbnail'),
  validate.createPost,
  controller.createPost
)

module.exports = router