function numberAfterPoint(v, l = 2) {
  let n = Number(v)
  let str = n.toString()
  let result = '.'.padEnd(l + 1, '0')
  if (str.includes('.')) {
    result = n
      .toString()
      .replace(/\d+(\.)/, '$1')
      .padEnd(l + 1, '0')
  }
  return result.substr(0, l + 1)
}

export default { numberAfterPoint }
