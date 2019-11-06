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

export default {
  sleep,
  browser
}
