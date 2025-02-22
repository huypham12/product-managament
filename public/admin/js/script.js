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
      console.log(url.href)
      window.location.href = url.href // chuyển hướng trang
    })
  })
}
//end button status