// change status

const buttonChangeStatus = document.querySelectorAll('[button-change-status]')
const formChangeStatus = document.querySelector('#form-change-status') // gọi đến cái form để sử dụng

if (buttonChangeStatus.length > 0 && formChangeStatus) {
  const path = formChangeStatus.getAttribute('data-path')
  buttonChangeStatus.forEach(button => {
    button.addEventListener('click', () => {
      const statusCurrent = button.getAttribute('data-status')
      const id = button.getAttribute('data-id')
      let statusChange = statusCurrent == 'active' ? 'inacctive' : 'active'

      const action = path + `/${statusChange}/${id}` + `?_method=PATCH`

      console.log(action)
      formChangeStatus.action = action
      formChangeStatus.submit()
    })
  })
}

// end change status


// delete item

const buttonDelete = document.querySelectorAll("[button-delete]")
const formDeleteItem = document.querySelector('#form-delete-item')


// code ở đây chỉ có nhiệm vụ xử lý sự kiện rồi submit lên
// cho server, còn server CRUD như thế nào thì đéo liên quan
// sau đó server lại render ra giao diện, nếu có thay đổi 
// gì thì sẽ đc cập nhật
if (buttonDelete.length > 0 && formDeleteItem) {
  const path = formDeleteItem.getAttribute('data-path')

  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm('chắc chắn xóa?')
      if (isConfirm) {
        const id = button.getAttribute('data-id')
        const action = `${path}/${id}?_method=PATCH`
        console.log(action)
        formDeleteItem.action = action
        formDeleteItem.submit()
      }
    })
  })
}

// end delete itemitem