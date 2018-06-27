let sideBar   = document.getElementById('side_bar')
let main      = document.getElementById('home')
let hamburger = document.getElementById('hamburger')
let footer    = document.getElementById('footer')

function menuOpen() {
  sideBar.setAttribute('style', 'width:180px;')
  main.style.marginLeft = '180px'
  footer.style.marginLeft = '180px'
  hamburger.style.visibility = 'hidden'
}

function menuClose() {
  sideBar.setAttribute('style', 'width:0')
  main.style.marginLeft = '0'
  footer.style.marginLeft = '0'
  hamburger.style.visibility = 'visible'
}