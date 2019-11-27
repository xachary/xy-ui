// 触发刷新
function pullRefresh(cb, el) {
  log('刷新触发')
  cb.call({}, function stop() {
    // 结束刷新反馈
    eh = 0
    height = 0
    move()
    loader.style.height = height
  })
}

function touchstart(el, { touches: [touch] }) {
  console.log('touchstart')
  el.classList.add('xy-pull-refresh')
  let { clientY: y } = touch
  sy = Math.round(y)
  my = sy
  direct = ''
  upLock = false
  downLock = false
  stLock = true
  log(`start->direct:${direct},sy:${sy},my:${my},st:${st},height:${height}`)
}

function touchmove(el, e) {
  console.log('touchmove')
  let {
    touches: [touch]
  } = e
  let { clientY: y } = touch
  my = Math.round(y)

  // 判断滑动方向
  if (sy > my) {
    direct = 'up'
  } else if (sy < my) {
    direct = 'down'
  } else {
    direct = ''
  }

  // 预滑动宽度
  let heightTemp = my - sy + eh
  // 滚动必须为0, 且"下拉"开启
  if (st === 0 && stLock) {
    // 控制宽度
    if (heightTemp < 0) {
      heightTemp = 0
    } else if (heightTemp > pullHeight) {
      heightTemp = pullHeight
    }
  } else {
    heightTemp = 0
  }
  log(
    `move->direct:${direct},sy:${sy},my:${my},st:${st},height:${height},heightTemp:${heightTemp}`
  )
  // 下拉方向
  if (direct === 'down') {
    // 上划锁, 停止下拉
    height = upLock ? 0 : heightTemp
    // 滚动为0的时候, 防止微信内置浏览器自带下拉傻逼信息展示
    if (st === 0) {
      e.preventDefault()
    }
    // 下滑锁开启
    downLock = true
  } else if (direct === 'up') {
    // 上划锁, 停止下拉
    height = downLock ? 0 : heightTemp
    // 上滑锁开启
    upLock = true
  }
  loader.style.height = `${height}px`
}

function touchend(el, { changedTouches: [touch] }) {
  let { clientY: y } = touch
  sy = Math.round(y)
  my = sy
  log(`end->direct:${direct},sy:${sy},my:${my},st:${st},height:${height}`)
  // 滑动结束, 根据最低宽度自动收缩/扩宽
  if (height > pullPoint) {
    height = pullHeight
    pullRefreshCb()
  } else {
    height = 0
  }
  eh = height
  direct = ''
  move()
  loader.style.height = `${height}px`
}

// window scroll event
function onWinScroll() {
  st = window.scrollY
  // 下拉关闭
  if (st > 0) {
    stLock = false
  }
  // 判断滑动方向
  if (st > sb) {
    direct = 'up'
  } else if (st < sb) {
    direct = 'down'
  } else {
    direct = ''
  }
  sb = st
  log(`scroll->direct:${direct},sy:${sy},my:${my},st:${st}`)
}

// 启动自动动画
function move() {
  loader.classList.add('xy-pull-refresh__bar--auto')
  clearTimeout(timer)
  timer = setTimeout(function() {
    loader.classList.remove('xy-pull-refresh__bar--auto')
  }, 300)
}

// 加载板
let loader = document.createElement('div')

// 日志板
let logger = document.createElement('div')
logger.style.position = 'fixed'
logger.style.zIndex = '100'
logger.style.bottom = 0
logger.style.left = 0
logger.style.width = '100%'
logger.style.backgroundColor = 'rgba(0,0,0,0.6)'
logger.style.fontSize = '14px'
logger.style.color = '#fff'
logger.style.minHeight = '16px'
logger.style.maxHeight = '160px'
logger.style.lineHeight = '16px'
logger.style.padding = '0 5px'
logger.style.overflow = 'auto'
logger.addEventListener(
  'touchstart',
  function(e) {
    e.stopPropagation()
  },
  true
)
logger.addEventListener(
  'touchmove',
  function(e) {
    e.stopPropagation()
  },
  true
)
logger.addEventListener(
  'touchend',
  function(e) {
    e.stopPropagation()
  },
  true
)
logger.innerHTML = ''

// 打日志
function log(str) {
  // console.log(str)
  // logger.innerHTML = logger.innerHTML + (logger.innerHTML ? '<br>' : '') + str
  // logger.scrollTop = logger.scrollHeight
}

// 动画计时器
let timer = null

// 下拉宽度
let pullHeight = 70

// 最小下拉宽度
let pullPoint = 60

// 上一次下拉宽度
let eh = 0

// 当前下拉宽度
let height = 0

// touch start y
let sy = 0

// touch move y
let my = 0

// scroll y
let st = 0

// 上一次 scroll y
let sb = 0

// 当前滚动方向
let direct = ''

// 上划锁
let upLock = false

// 下滑锁
let downLock = false

// 非下拉滑动锁
let stLock = true

let pullRefreshCb = function() {
  console.warn('no pull refresh callback function')
}

let touchstartCb = function() {
  console.warn('no pull refresh touchstart function')
}

let touchmoveCb = function() {
  console.warn('no pull refresh touchmove function')
}

let touchendCb = function() {
  console.warn('no pull refresh touchend function')
}

let onWinScrollCb = function() {
  console.warn('no scroll function')
}

export default {
  name: 'xy-pull-refresh',
  bind: function(el, { value, arg }) {
    // 对外
    if (value) {
      pullRefreshCb = pullRefresh.bind({}, value, el)
    }
    el.classList.add('xy-pull-refresh')
    loader.style.height = '0'
    loader.classList.add('xy-pull-refresh__bar')
    loader.innerHTML = '<span></span><span></span><span></span>'
    el.insertBefore(loader, el.children[0])
    touchstartCb = touchstart.bind({}, el)
    touchmoveCb = touchmove.bind({}, el)
    touchendCb = touchend.bind({}, el)
    onWinScrollCb = onWinScroll.bind({}, el)
    el.addEventListener('touchstart', touchstartCb)
    el.addEventListener('touchmove', touchmoveCb)
    el.addEventListener('touchend', touchendCb)
    window.addEventListener('scroll', onWinScrollCb)
  },
  unbind: function(el) {
    // 解绑所有事件
    el.removeEventListener('touchstart', touchstartCb)
    el.removeEventListener('touchmove', touchmoveCb)
    el.removeEventListener('touchend', touchendCb)
    window.removeEventListener('scroll', onWinScrollCb)
  }
}
