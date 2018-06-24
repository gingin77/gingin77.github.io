let { innerWidth, innerHeight } = window

let loader = document.getElementById('loader')
let contents = document.getElementById('contents')

document.onreadystatechange = function () {
  var state = document.readyState
  if (innerWidth > 500) {
    adjustForNotSmallVP();
    if (state === 'interactive') {
      alignContactPhotoNonMob();
    } else if (state === 'complete') {
      setTimeout(function () {
        loader.classList.add('fadeOut')
        showContents()
      }, 200)
    }
  } else {
    contents.classList.remove('not_visible')
    adjustForSmallVP()
    loader.remove()
  }
}

window.onresize = adjustIfNeeded();

function adjustIfNeeded () {
  if (innerWidth <= 500) {
    loader.remove();
    adjustForSmallVP();
  } else {
    alignContactPhotoNonMob();
    adjustForNotSmallVP();
  }
}

function showContents () {
  setTimeout(function () {
    contents.classList.remove('not_visible')
    removeLoader()
  }, 200)
}

function removeLoader () {
  setTimeout(function () {
    loader.remove()
  }, 100)
}

function alignContactPhotoNonMob () {
  let self = document.getElementById('self')
  let connectMessage = document.getElementById('connect_message')
  let divToDelete = document.getElementById('self_img_holder')
  connectMessage.appendChild(self)
  if (divToDelete !== null) {
    divToDelete.remove()
  }
}

function adjustForNotSmallVP() {
  let elsToRemove = document.getElementsByClassName("removeOnNonMobile");
  for (let i = elsToRemove.length - 1; i >= 0; i--) {
    elsToRemove[i].remove()
  }
}

function adjustForSmallVP () {
  rmElsForMob()
  adjPhotoMob()
  addFooterStylesMob()
  modResMob()
}

function modResMob () {
  let parent = document.getElementsByTagName('ul')[0]
  let resume = document.getElementsByTagName('dt')[0]
  resume.innerHTML = '<a href="public/G.Hench_Resume_Nov.pdf" download>Resume</a>'
  parent.appendChild(resume)
  let dlEl = document.getElementsByTagName('dl')[0]
  if (dlEl !== undefined) {
    dlEl.remove()
  }
}

function rmElsForMob () {
  let elsToRemove = document.getElementsByClassName('removeOnMobile')
  console.log(elsToRemove)
  for (let i = elsToRemove.length - 1; i >= 0; i--) {
    elsToRemove[i].remove()
  }
}

function addFooterStylesMob () {
  let footerEl = document.getElementById('footer')
  footerEl.classList.add('footer_mobile')
}

function adjPhotoMob () {
  let imageHolder = document.getElementById('image_holder')
  imageHolder.classList.remove('image_holder')
  imageHolder.classList.add('image_holder_mob')
}