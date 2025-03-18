const express = require('express')
const router = express.Router()
const controller = require('../../controller/client/products/product.controller.js')

// root ở đây là /products, những cái route trong này đều là con của /products
router.get('/', controller.index)
router.get('/:slug', controller.detail)

module.exports = router