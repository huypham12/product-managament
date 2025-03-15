
// middleware xử lý dữ liệu trước khi đưa tới controller để controller làm việc với db
module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash('error', 'vui lòng nhập tiêu đề')
    res.redirect(req.get("Referrer"))
    return
  }
  next()
}

