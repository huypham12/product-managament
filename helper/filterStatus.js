module.exports = (query) => {
  let filterStatus = [
    {
      name: 'Tất cả',
      status: '',
      class: ''
    },
    {
      name: 'Hoạt động',
      status: 'active',
      class: ''
    },
    {
      name: 'Dừng hoạt động',
      status: 'inactive',
      class: ''
    }
  ]


  // chỉnh sửa class để đổi màu nút khi nhấn
  if (query.status) {
    const index = filterStatus.findIndex(item =>
      item.status == query.status
    )
    filterStatus[index].class = 'active'
  } else {
    filterStatus[0].class = 'active'
  }


  // trả về  cái mảng status dùng bên controller, mảng này gồm 3 trạng thái là none, active, inactive
  return filterStatus
}