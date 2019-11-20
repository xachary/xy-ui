const dayLong = 1000 * 60 * 60 * 24
const hourLong = 1000 * 60 * 60

function fixDate(date) {
  if (typeof date === 'string') {
    let fix = date.replace(/-/g, '/')
    return isNaN(Date.parse(fix)) ? new Date() : new Date(fix)
  } else if (typeof date === 'number') {
    return new Date(date)
  }
  return isNaN(Date.parse(date)) ? new Date() : new Date(date)
}

function formatDate(d, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let date = fixDate(d)
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

function relativeDate(v, fmt = 'yyyy-MM-dd hh:mm:ss') {
  var now = new Date()
  var time = fixDate(v)
  var span = now - time
  var day = Math.floor(span / 86400000)
  var hour = Math.floor(span / 3600000)
  var minute = Math.floor(span / 60000)
  // var second = Math.floor(span / 1000)

  if (day > 1) {
    if (day <= 3) {
      return `${day.toString()}天前`
    } else {
      return this.formatDate(time, fmt)
    }
  } else if (day > 0 && day <= 1) {
    return `${day.toString()}天前`
  } else if (hour > 0) {
    return `${hour.toString()}小时前`
  } else if (minute > 0) {
    return `${minute.toString()}分钟前`
  }
  return '刚刚'
}

function today(fmt) {
  let td = new Date(new Date().setHours(0, 0, 0, 0))
  return fmt ? formatDate(td, fmt) : td
}

function startTime(date, fmt = '', offset = 0) {
  let d = fixDate(date)
  let td = new Date(new Date(d).setHours(0, 0, 0, 0) + dayLong * offset)
  return fmt ? formatDate(td, fmt) : td
}

function endTime(date, fmt = '') {
  let d = fixDate(date)
  let td = new Date(new Date(d).setHours(23, 59, 59, 0))
  return fmt ? formatDate(td, fmt) : td
}

function weekStartTime(d, fmt = '', offset = 0) {
  let date = fixDate(d)
  let now = date ? this.startTime(date) : today()
  let day = now.getDay()
  let td = new Date(
    now.getTime() - dayLong * (day === 0 ? 6 : day - 1) + dayLong * 7 * offset
  )
  return fmt ? formatDate(td, fmt) : td
}

function weekEndTime(d, fmt = '', offset = 0) {
  let date = fixDate(d)
  let now = date ? this.endTime(date) : today()
  let day = now.getDay()
  let td = new Date(
    now.getTime() + dayLong * (day === 0 ? 0 : 7 - day) + dayLong * 7 * offset
  )
  return fmt ? formatDate(td, fmt) : td
}

function monthStartTime(d, fmt = '', offset = 0) {
  let date = fixDate(d)
  let now = date ? this.startTime(date) : today()
  let month = now.getMonth()
  let td = new Date(now.setMonth(month + offset, 1))
  return fmt ? formatDate(td, fmt) : td
}

function monthEndTime(d, fmt = '', offset = 0) {
  let date = fixDate(d)
  let now = date ? this.endTime(date) : today()
  let month = now.getMonth()
  let td = new Date(now.setMonth(month + 1 + offset, 0))
  return fmt ? formatDate(td, fmt) : td
}

function yearStartTime(d, fmt = '', offset = 0) {
  let date = fixDate(d)
  let now = date ? this.startTime(date) : today()
  let year = now.getFullYear()
  let td = new Date(new Date(now.setFullYear(year + offset)).setMonth(0, 1))
  return fmt ? formatDate(td, fmt) : td
}

function yearEndTime(d, fmt = '', offset = 0) {
  let date = fixDate(d)
  let now = date ? this.endTime(date) : today()
  let year = now.getFullYear()
  let td = new Date(new Date(now.setFullYear(year + offset)).setMonth(12, 0))
  return fmt ? formatDate(td, fmt) : td
}

function timeSpanSecond(start, end) {
  let s = fixDate(start)
  let e = fixDate(end)
  return Math.floor((e - s) / 1000)
}

function timeSpanDay(start, end) {
  let s = startTime(start)
  let e = startTime(end)
  return (e - s) / dayLong
}

function timeSpanHour(start, end) {
  let s = fixDate(start)
  let e = fixDate(end)
  return Math.floor((e - s) / hourLong)
}

export default {
  formatDate,
  relativeDate,
  today,
  startTime,
  endTime,
  weekStartTime,
  weekEndTime,
  monthStartTime,
  monthEndTime,
  yearStartTime,
  yearEndTime,
  timeSpanSecond,
  timeSpanDay,
  timeSpanHour
}
