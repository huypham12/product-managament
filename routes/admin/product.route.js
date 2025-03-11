const express = require('express')
const router = express.Router()
const multer = require('multer')
const storageMulter = require('../../helper/storage.Multer.js')
const upload = multer({ storage: storageMulter()})
const controller = require('../../controller/admin/product.controller.js')




// mấy cái route này là để client giao tiếp với server
// thông qua route trình duyệt gửi request và server sẽ 
// response lại cho trình duyệt
// 👉 Người dùng bấm nút "Cập nhật trạng thái sản phẩm"
// 👉 Trình duyệt gửi request lên server / products / update
// 👉 Server cập nhật database rồi trả về kết quả
// 👉 Trình duyệt nhận phản hồi và hiển thị kết quả
router.get('/', controller.product)

// truyền động status và id
router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi/', controller.changeMulti)

router.patch('/delete/:id', controller.deleteItem)

router.patch('/delete-all/', controller.deleteAll)

router.get('/create', controller.create)

router.post('/create',
  upload.single('thumbnail')
  , controller.createPost)


module.exports = router
