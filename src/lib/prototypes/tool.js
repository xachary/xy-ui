function sleep(ms) {
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
var moveTool = (function() {
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

  /**
   * 缓动方法(多次)
   * @param list 数值变化数组,如[0,100,300...]即值从0到100,然后从100到300...
   * @param callback 每帧回调
   * @param finish 完成回调
   * @param r 动画时长(可选)
   * @param fn 缓动公式(可选)
   */
  function moveSq(list, callback, finish, r, fn) {
    if (list.length > 1) {
      moveDeep(list, callback, finish, r, 0, list.length, fn)
    } else {
      if (typeof finish == 'function') {
        finish.call()
      }
    }
  }

  //moveSq的递归方法
  function moveDeep(list, callback, finish, r, index, length, fn) {
    move(
      list[index],
      list[index + 1],
      function(val) {
        callback.call(null, val, index)
      },
      function() {
        if (index < length - 2) {
          moveDeep(list, callback, finish, r, index + 1, length, fn)
        } else {
          if (typeof finish == 'function') {
            finish.call()
          }
        }
      },
      r,
      fn
    )
  }

  return {
    move: move,
    moveSq: moveSq
  }
})()

function scrollTop() {
  moveTool.move(
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
  moveTool.move(
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
  sleep,
  browser,
  scrollTop,
  scrollBottom
}
