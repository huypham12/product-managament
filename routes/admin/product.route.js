const express = require('express')
const router = express.Router()
const controller = require('../../controller/admin/product.controller.js')

router.get('/', controller.product)

module.exports = router
