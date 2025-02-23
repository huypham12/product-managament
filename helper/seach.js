// chức năng tìm kiếm

module.exports = (query, find) => {

  // nếu cái query nó có status thì sẽ thêm cái status đấy vào hàm find để lọc
  if (query.status) {
    find.status = query.status
  }

  // Tìm kiếm theo từ khóa (title chứa từ khóa)
  if (query.keyword) {
    find.title = { $regex: query.keyword, $options: 'i' }; // lấy những title có chứa keyword
  }
  return find
}