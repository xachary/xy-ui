let timer = null

function btnClick(el, e) {
  if (el.hasAttribute('xy-btn-act-scale')) {
    el.setAttribute('xy-btn-act-scale--moving', '')
  } else if (el.hasAttribute('xy-btn-act-color')) {
    el.setAttribute('xy-btn-act-color--moving', '')
    let color = el.getAttribute('xy-btn-act-color')
    el.style.backgroundColor = color
  } else if (el.hasAttribute('xy-btn-act-grayscale')) {
    el.setAttribute('xy-btn-act-grayscale--moving', '')
  } else if (el.hasAttribute('xy-btn-act-wave')) {
    el.setAttribute('xy-btn-act-wave--moving', '')
    let rect = el.getBoundingClientRect()
    let long = rect.width > rect.height ? rect.width : rect.height
    long = long * 2
    let color = el.getAttribute('xy-btn-act-wave')
    let circle = document.createElement('div')
    circle.classList.add('xy-btn-act-wave__circle')
    circle.style.backgroundColor = color
    circle.style.left = `${e.x - rect.x - long / 2}px`
    circle.style.top = `${e.y - rect.y - long / 2}px`
    circle.style.width = `${long}px`
    circle.style.height = `${long}px`
    el.prepend(circle)
  }
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  if (el.hasAttribute('xy-btn-act-wave')) {
    timer = setTimeout(function() {
      el.removeAttribute('xy-btn-act-wave--moving')
      let targets = [...el.children]
      for (let i = 0; i < targets.length; i++) {
        if (targets[i].classList.contains('xy-btn-act-wave__circle')) {
          targets[i].remove()
        }
      }
    }, 600)
  } else {
    timer = setTimeout(function() {
      if (el.hasAttribute('xy-btn-act-scale')) {
        el.removeAttribute('xy-btn-act-scale--moving')
      } else if (el.hasAttribute('xy-btn-act-color')) {
        el.removeAttribute('xy-btn-act-color--moving')
        el.style.backgroundColor = null
      } else if (el.hasAttribute('xy-btn-act-grayscale')) {
        el.removeAttribute('xy-btn-act-grayscale--moving')
      }
    }, 300)
  }
}

let btnClickCb = function() {
  console.warn('no moving btn callback function')
}

export default {
  name: 'xy-btn-act',
  bind: function(el, e) {
    let { value, arg, modifiers } = e
    if (arg === 'style') {
      if (modifiers.scale) {
        el.setAttribute('xy-btn-act-scale', '')
      } else if (modifiers.color) {
        el.setAttribute('xy-btn-act-color', value)
      } else if (modifiers.grayscale) {
        el.setAttribute('xy-btn-act-grayscale', value)
      } else if (modifiers.wave) {
        el.setAttribute('xy-btn-act-wave', value)
      }
    }
    el.setAttribute('xy-btn-act', '')
    btnClickCb = btnClick.bind({}, el)
    el.addEventListener('click', btnClickCb)
  },
  unbind: function(el) {
    el.removeEventListener('click', btnClickCb)
  }
}

// let timer = null

// function btnClick (el) {
//   el.setAttribute('xy-hover-btn--moving', '')
//   if (timer) {
//     clearTimeout(timer)
//     timer = null
//   }
//   timer = setTimeout(function () {
//     el.removeAttribute('xy-hover-btn--moving')
//   }, 300)
// }

// let btnClickCb = function () {
//   console.warn('no moving btn callback function')
// }

// export default {
//   name: 'xy-hover-btn',
//   bind: function (el) {
//     el.setAttribute('xy-hover-btn', '')
//     btnClickCb = btnClick.bind({}, el)
//     el.addEventListener('click', btnClickCb)
//   },
//   unbind: function (el) {
//     el.removeEventListener('click', btnClickCb)
//   }
// }
