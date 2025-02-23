
module.exports = (query, countProducts, objectPagination) => {
  // pagination

  if (query.page) {
    objectPagination.currentPage = parseInt(query.page)
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem // thiết lập ví trí bắt đầu của mỗi trang

  const totalPage = Math.ceil(countProducts / objectPagination.limitItem)
  objectPagination.totalPage = totalPage

  return objectPagination
  // end pagination
}