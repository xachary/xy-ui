import Vue from 'vue'

import xyPopImage from '../components/xy-pop-image.vue'

let cp = Vue.extend(xyPopImage)

let handlers = new Map()

let clicks = new Map()

let pops = {}

let instances = {}

let btnClickCb = function () {
  console.warn('no moving btn callback function')
}

function btnClick (el) {
  if (el.getAttribute('lazy') === 'loaded') {
    var parent = el.parentElement
    var hasA = false

    while (parent && !parent.classList.contains('xy-article')) {
      // console.log(parent)
      parent = parent.parentElement
      if (parent) {
        hasA = parent.tagName === 'A'
        if (hasA) {
          break
        }
      } else {
        break
      }
    }

    if (hasA) {
      return
    }
    // debugger
    instances[el.dataset.id].visible = true
    instances[el.dataset.id].img = el.dataset.img
    instances[el.dataset.id].index = el.dataset.index
  } else if (el.tagName !== 'IMG') {
    instances[el.dataset.id].visible = true
    instances[el.dataset.id].img = el.dataset.img
    instances[el.dataset.id].index = el.dataset.index
  }
}

let count = 0

export default {
  name: 'xy-pop-image',
  bind: function (el, {value, arg}) {
    let instance = new cp({
      el: document.createElement('div')
    })
    instance.$el.dataset.id = count++
    el.dataset.id = instance.$el.dataset.id

    document.body.appendChild(instance.$el)
    instances[el.dataset.id] = instance
    pops[el.dataset.id] = value
    // debugger

    if (arg === 'change' && value) {
      // if (handlers.has(value)) {
      //   let els = handlers.get(value)
      //   els.push(el)
      //   handlers.set(value, els)
      // } else {
      //   handlers.set(value, [el])
      //   instance.$on('on-change', value)
      // }
    } else if (arg === 'imgs' && value) {
      instance.$on('on-change', function (direction, data) {
        // debugger
        let imgs = pops[el.dataset.id]
        let idx = imgs.indexOf(instances[el.dataset.id].img)
        let next = direction === 'pre' ? ((imgs.length + idx - 1) % imgs.length) : ((idx + 1) % imgs.length)
        console.log('next:', next)
        instances[el.dataset.id].img = imgs[next]
      })
    }
    btnClickCb = btnClick.bind({}, el)
    el.addEventListener('click', btnClickCb)

    clicks.set(el, btnClickCb)
  },
  unbind: function (el, {value, arg}) {
    // if (instance) {
    //   instance.visible = false
    // }
    if (arg === 'change' && value) {
      // debugger
      // let els = handlers.get(value)
      // els.splice(els.indexOf(el), 1)
      // handlers.set(value, els)
    }
    let hd = clicks.get(el)
    el.removeEventListener('click', hd)
    clicks.delete(el)
  }
}