function delay(ms) {
  return (function() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log('done')
        resolve()
      }, ms)
    })
  })()
}

function browser() {
  let result = {
    type: '',
    wx: false
  }
  if (navigator) {
    if (/(iPhone|iPad|iPod|iOS|Android|X11)/i.test(navigator.userAgent)) {
      var u = navigator.userAgent
      var isAndroid =
        u.indexOf('Android') > -1 ||
        u.indexOf('Adr') > -1 ||
        u.indexOf('X11') > -1 //android终端
      var isiOS = Boolean(u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) //ios终端
      if (isAndroid) {
        result.type = 'android'
      } else if (isiOS) {
        result.type = 'ios'
      } else {
        result.type = 'other'
      }
      result.wx = /MicroMessenger/.test(u)
    } else {
      result.type = 'pc'
    }
  }
  return result
}

/**
 * 缓动工具
 */
//缓动公式
var moveFn = {
  Linear: function(t, b, c, d) {
    return (c * t) / d + b
  },
  CircularEaseInOut: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b
    return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
  },
  CubicEaseOut: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  },
  QuartEaseOut: function(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  },
  ExpoEaseOut: function(t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b
  }
}

//毫秒
var rate = 1000
var time = 10

/**
 * 缓动方法
 * @param before 前值
 * @param after 后值
 * @param callback 每帧回调
 * @param finish 完成回调
 * @param r 动画时长(可选)
 * @param fn 缓动公式(可选)
 */
function move(before, after, callback, finish, r, fn) {
  var i = 0,
    itv = null,
    func = null
  if (!r) {
    r = rate
  }
  if (!fn) {
    func = moveFn.CircularEaseInOut
  } else {
    func = moveFn[fn]
  }
  itv = setInterval(function() {
    var s = (r * time) / 100
    var n = func(i, before, after - before, s)
    if (typeof callback == 'function') {
      callback.call(null, n)
    }
    if (i >= s) {
      clearInterval(itv)
      itv = null
      if (typeof finish == 'function') {
        finish.call()
      }
    } else {
      i++
    }
  }, time)
  return itv
}

function scrollTop() {
  move(
    (document.body.scrollHeight - window.innerHeight) * 1.1,
    0,
    function(v) {
      window.scrollTo(0, v)
    },
    function() {},
    400,
    'CircularEaseInOut'
  )
}

function scrollBottom() {
  move(
    0,
    (document.body.scrollHeight - window.innerHeight) * 1.1,
    function(v) {
      window.scrollTo(0, v)
    },
    function() {},
    400,
    'CircularEaseInOut'
  )
}

export default {
  delay,
  browser,
  move,
  scrollTop,
  scrollBottom
}
