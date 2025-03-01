const express = require('express')
const router = express.Router()
const controller = require('../../controller/admin/trash.controller')



router.get('/', controller.trash) // render giao diện cho người dùng nên phải dùng get

router.patch('/restore/:id', controller.restore) // update nên dùng patch

router.delete('/delete/:id', controller.delete) // xóa vĩnh viễn nên dùng delete

module.exports = router