let scrolly = 0
let position = 'unset'
let top = 0
let left = 0
let width = 0
let zindex = 0
let boxshadow = 'none'
let height = 0
let scrolly2 = 0
let checkTimer = null
let checkCount = 0
let stop = false

function resetCheck(el) {
  if (
    window.scrollY <= scrolly2 ||
    (window.scrollY <= 1 && window.scrollY <= scrolly)
  ) {
    stop = true
    setTimeout(function() {
      stop = false
    }, 300)
    el.style.position = position
    el.style.top = top
    el.style.left = left
    el.style.width = width
    el.style.zIndex = zindex
    el.style.boxShadow = boxshadow
    // el.classList.remove('xy-keep-top--ing')
    el.removeAttribute('xy-keep-top--ing')
    if (el.nextElementSibling) {
      el.nextElementSibling.style.marginTop = 0
    }
    clearInterval(checkTimer)
    checkTimer = null
  } else {
    if (checkCount > 5) {
      clearInterval(checkTimer)
      checkTimer = null
    }
  }
}

function scroll(el) {
  if (!stop) {
    if (el.hasAttribute('xy-keep-top--ing')) {
      resetCheck(el)
    } else if (
      el.getBoundingClientRect().top <= 0 &&
      !el.hasAttribute('xy-keep-top--ing')
    ) {
      position = el.style.position
      top = el.style.top
      left = el.style.left
      width = el.style.width
      zindex = el.style.zIndex
      boxshadow = el.style.boxShadow
      scrolly2 = window.scrollY
      el.style.position = 'fixed'
      el.style.top = '0'
      el.style.left = '0'
      el.style.width = '100%'
      el.style.zIndex = '100'
      el.style.boxShadow = '0 1px 10px rgba(0,0,0,.1)'
      // el.classList.add('xy-keep-top--ing')
      el.setAttribute('xy-keep-top--ing', '')
      if (el.nextElementSibling) {
        el.nextElementSibling.style.marginTop = `${height}px`
      }
      scrolly = window.scrollY

      checkCount = 0
      checkTimer = setInterval(function() {
        console.log(checkCount)
        checkCount++
        resetCheck(el)
      }, 200)
    }
  }
}

let scrollCb = function() {
  console.warn('no scroll callback function')
}

export default {
  name: 'xy-keep-top',
  bind: function(el) {
    // el.classList.add('xy-keep-top')
    el.setAttribute('xy-keep-top', '')
    scrollCb = scroll.bind({}, el)
    window.addEventListener('scroll', scrollCb)
  },
  inserted: function(el) {
    height = el.offsetHeight
  },
  unbind: function() {
    window.removeEventListener('scroll', scrollCb)
  }
}
