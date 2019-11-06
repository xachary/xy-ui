function formatDate(d, fmt) {
  let fix = typeof d === 'string' ? d.replace(/-/g, '/') : d
  let date = new Date(fix)
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
    D: '星期' + ['一', '二', '三', '四', '五', '六', '日'][date.getDay() - 1] // 星期
  }
  var format = fmt
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      String(date.getFullYear()).substr(4 - RegExp.$1.length)
    )
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ('00' + o[k]).substr(String(o[k]).length)
      )
    }
  }
  return format
}

function relativeDate(v) {
  var now = new Date()
  var time = new Date(v)
  var span = now - time
  var day = Math.floor(span / 86400000)
  var hour = Math.floor(span / 3600000)
  var minute = Math.floor(span / 60000)
  // var second = Math.floor(span / 1000)

  if (day > 1) {
    return this.formatDate(time, 'yyyy-MM-dd hh:mm')
  } else if (day > 0 && day <= 1) {
    return `${day.toString()}天前`
  } else if (hour > 0) {
    return `${hour.toString()}小时前`
  } else if (minute > 0) {
    return `${minute.toString()}分钟前`
  }
  return '刚刚'
}

export default { formatDate, relativeDate }
