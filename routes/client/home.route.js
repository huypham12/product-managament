const express = require('express')
const router = express.Router()
const controller = require('../../controller/client/home/home.controller.js')

router.get('/', controller.index)

module.exports = router