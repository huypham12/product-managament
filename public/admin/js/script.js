// button status
// xử lý sự kiện khi click thì sẽ lấy ra được cái status để đưa vào link

const buttonStatus = document.querySelectorAll("[button-status]")
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href) // lấy url trang hiện tại

  buttonStatus.forEach(button => {
    button.addEventListener('click', () => {
      const status = button.getAttribute('button-status') //click vào cái nút này sẽ lấy ra được status atribute đc viết bên thẻ pug
      if (status) {
        url.searchParams.set('status', status) // truyền thêm status vào url
      } else {
        url.searchParams.delete('status')
      }
      window.location.href = url.href // chuyển hướng trang
    })
  })
}
//end button status


// form search

const formSeach = document.querySelector('#form-search')
if (formSeach) {
  let url = new URL(window.location.href)
  formSeach.addEventListener('submit', (event) => {
    event.preventDefault() // set k load lại trang
    console.log(event.target.elements.keyword.value) // lấy ra value trong thanh nhập keyword
    const keyword = event.target.elements.keyword.value
    if (keyword) {
      url.searchParams.set('keyword', keyword)
    }
    else {
      url.searchParams.delete('keyword')
    }
    window.location.href = url.href // chuyển hướng trang
  })
}
// end form search


// pagination
// ddm mình dùng thẻ a là link sang rồi thì cần đéo gì xử lý cái sự kiện click nút để đổi cái href cho dài:))))
// const linkPagination = document.querySelectorAll("[link-pagination]")
// console.log(linkPagination.length)
// if (linkPagination.length > 0) {
//   linkPagination.forEach(link => {
//     link.addEventListener('click', () => {
//       const page = link.getAttribute("link-pagination")
//       url.searchParams.set('page', page)
//       window.location.set(url.href)
//     })
//   })
// }
// end pagination



// checkbox


// xử lý việc click chọn tất cả
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']")

  inputCheckAll.addEventListener('click', () => {
    if (inputCheckAll.checked) {
      // nút all click thì duyệt để tất cả đều tích chọn
      inputsId.forEach(input => {
        input.checked = true
      })
    } else {
      inputsId.forEach(input => {
        input.checked = false
      })
    }
  })

  inputsId.forEach(input => {
    input.addEventListener('click', () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length

      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true
      } else {
        inputCheckAll.checked = false
      }

    })
  })

}
// end checkbox


// form change multi

const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
  const path = formChangeMulti.getAttribute('data-path')
  console.log(path)
  formChangeMulti.addEventListener('submit', (e) => {
    e.preventDefault()
    const typeChange = e.target.elements.type.value
    console.log(typeChange)
    if (typeChange == 'delete-all') {
      const isConfirm = confirm('Bạn chắc chắn xóa các sản phẩm này')
      if (!confirm) return
      // thay đổi action đúng với cái route đã tạo
      formChangeMulti.action = path + `/delete-all?_method=PATCH`
    } else {
      const isConfirm = confirm('Bạn chắc chắn thay đổi trạng thái các sản phẩm này')
      if (!confirm) return
      formChangeMulti.action = path + `/change-multi?_method=PATCH`
    }

    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")
    if (inputsChecked.length == 0) {
      alert('chọn ít nhất 1 bản ghi')
    } else {
      let ids = []
      const inputsId = formChangeMulti.querySelector("input[name='ids'")

      inputsChecked.forEach(input => {

        if (typeChange == "change-position") {
          const id = input.value
          // thoát thẻ con để đến thẻ cha rồi vào thẻ con khác
          const position = input.closest('tr').querySelector("input[name='position']").value
          console.log(position)
          ids.push(`${id}-${position}`)
        } else {
          const id = input.value // lấy id của các sp từ ô input đã đc gán sẵn
          ids.push(id)
        }
      })

      inputsId.value = ids.join(',')
      formChangeMulti.submit()
    }
  })
}

// end form change multi


// show alert

const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
  const timeout = parseInt(showAlert.getAttribute("data-time"))
  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, timeout);
}
// end show alert



// tắt thông báo
const closeAlertBtn = document.querySelector("[close-alert]");
if (closeAlertBtn) {
  closeAlertBtn.addEventListener("click", function () {
    this.parentElement.classList.add("alert-hidden");
  });
}

// kết thúc tắt thông báo

// preview img
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}


// end preview img


