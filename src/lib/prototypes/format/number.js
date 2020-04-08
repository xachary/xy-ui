function format(
  v,
  opt = {
    fixed: -1,
    comma: false,
    plus: false,
  }
) {
  let { fixed, comma, plus } = Object.assign(
    {
      fixed: -1,
      comma: false,
      plus: false,
    },
    opt
  )

  let parsed = v && v.toString ? v.toString() : ''
  parsed = parsed.replace(/[^\d.-]/g, '')
  parsed = parsed.replace(/^[^\d-]/g, '')
  let isF = /^-/.test(parsed)
  parsed = parsed.replace(/-/g, '')
  if (/^\.+/.test(parsed)) {
    parsed = parsed.replace(/^\.+/, '')
  }
  if (parsed.length > 1) {
    if (/^0+/.test(parsed)) {
      parsed = parsed.replace(/^0+/, '0')
    }
    if (/^0[^.]/.test(parsed)) {
      parsed = parsed.replace(/^0+/, '')
    }
  }
  if (parsed.split('').filter((o) => o === '.').length > 1) {
    let first = parsed.indexOf('.')
    parsed = parsed.replace(/\./g, '')
    let temp = parsed.split('')
    temp.splice(first, 0, '.')
    parsed = temp.join('')
  }
  if (/\.0+$/.test(parsed)) {
    parsed = parsed.replace(/\.0+$/, '')
  }
  if (/\.+$/.test(parsed)) {
    parsed = parsed.replace(/\.+$/, '')
  }
  if (parsed.length === 0) {
    parsed = '0'
  }

  let num = 0
  if (fixed >= 0) {
    num = parseFloat(parsed).toFixed(fixed)
  } else {
    num = parseFloat(parsed)
  }

  if (comma) {
    let left = num.toString().replace(/\..*$/, '')
    let right = num.toString().match(/\..*$/)
    left = left
      .split('')
      .reverse()
      .join('')
      .replace(/(\d{3})/g, '$1,')
      .split('')
      .reverse()
      .join('')
    left = left.replace(/^,/, '')
    if (isF) {
      left = '-' + left
    } else {
      if (plus) {
        left = '+' + left
      }
    }
    return right ? left + right[0] : left
  }

  if (isF) {
    return plus ? '-' + num : -num
  } else {
    return plus ? '+' + num : num
  }
}

function numberAfterPoint(v, l = -1) {
  let n = format(v)
  let str = n.toString()
  let result = l >= 0 ? '.'.padEnd(l + 1, '0') : ''
  if (str.includes('.')) {
    result = n.toString().replace(/\d+(\.)/, '$1')

    if (l >= 0) {
      result = result.padEnd(l + 1, '0')
    }
  }
  return l >= 0 ? result.substr(0, l + 1) : result
}

export default { numberAfterPoint, format }
