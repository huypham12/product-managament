
const formRestoreItem = document.querySelector('#form-restore-item')
const formDeleteItem = document.querySelector('#form-delete-item')
const buttonRestore = document.querySelectorAll('.button-restore') // all vì có nhiều nút như này trên page
const buttonDelete = document.querySelectorAll('.button-delete')

//khôi phục
if (buttonRestore) {
  buttonRestore.forEach(button => {
    button.addEventListener('click', () => {
      const isConfirm = confirm('chắc chắn khôi phục?')
      if (isConfirm) {
        const path = formRestoreItem.getAttribute('data-path')
        const id = button.getAttribute('data-id')
        const action = `${path}/${id}?_method=PATCH`
        console.log(action)
        formDeleteItem.action = action
        formDeleteItem.submit()
      }
    })
  })
}

// xóa vĩnh viễn
if (buttonDelete) {
  buttonDelete.forEach(button => {
    button.addEventListener('click', () => {
      const isConfirm = confirm('chắc chắn khôi phục?')
      if (isConfirm) {
        const path = formDeleteItem.getAttribute('data-path')
        const id = button.getAttribute('data-id')
        const action = `${path}/${id}?_method=DELETE`
        console.log(action)
        formDeleteItem.action = action
        formDeleteItem.submit()
      }
    })
  })
}


