function def(v, str = '无') {
  if (typeof v === 'string' && v === '') {
    return str
  } else if (typeof v === 'undefined' || v === null) {
    return str
  }
  return v
}

export default { def }
