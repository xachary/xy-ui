// url地址
function url(t) {
  const re = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  let result = re.test(t)
  return { valid: result, msg: result ? '' : 'url格式不正确' }
}
// 邮箱
function email(t) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  let result = re.test(t)
  return { valid: result, msg: result ? '' : 'email格式不正确' }
}
// 身份证
function idCard(code) {
  let result = false
  let msg = ''
  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  if (typeof code === 'string') {
    if (code.length === 18) {
      if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
        msg = '证件号码格式错误'
      } else if (!city[code.substr(0, 2)]) {
        msg = '地址编码错误'
      } else {
        //18位身份证需要验证最后一位校验位
        code = code.split('')
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x']
        var sum = 0
        var ai = 0
        var wi = 0
        for (var i = 0; i < 17; i++) {
          ai = code[i]
          wi = factor[i]
          sum += ai * wi
        }
        // var last = parity[sum % 11]
        if (parity[sum % 11] !== code[17]) {
          msg = '证件号码校验位错误'
        } else {
          result = true
        }
      }
    } else {
      msg = '证件号码长度不为18位'
    }
  } else {
    msg = '证件号码不能为空'
  }
  return { valid: result, msg }
}
// 港澳台居民居住证
function residencePermit(t) {
  if (!/8[123]000(\d{12}(\d|X|x))$/.test(t)) {
    return { valid: false, msg: '港澳台居民居住证不正确' }
  }
  return { valid: true, msg: '' }
}
// 统一社会信用代码
function creditCode(t) {
  if (!/[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/.test(t)) {
    return { valid: false, msg: '统一社会信用代码不正确' }
  }
  return { valid: true, msg: '' }
}
// 外国人永久居留身份证
function chinagreenCard(t) {
  if (!/^[a-zA-Z]{3}\d{12}$/.test(t)) {
    return { valid: false, msg: '外国人永久居留身份证' }
  }
  return { valid: true, msg: '' }
}
// 军人证件号
function militaryCard(t) {
  if (!/^[^\s]{18}$/.test(t)) {
    return { valid: false, msg: '军人证件号' }
  }
  return { valid: true, msg: '' }
}
// 回乡证
function homeReturnPermit(code) {
  let result = false
  let msg = ''
  if (typeof code === 'string') {
    if (code.length >= 9 || code.length <= 11) {
      if (!code || !/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(code)) {
        msg = '回乡证件号码格式错误'
      } else {
        result = true
      }
    } else {
      msg = '回乡证件号码长度不为11位'
    }
  } else {
    msg = '回乡证证件号码不能为空'
  }
  return { valid: result, msg }
}
// 护照
// backup /^[a-zA-Z0-9]{5,9}$/
function passport(code) {
  let result = false
  let msg = ''
  if (typeof code === 'string') {
    if (code.length >= 5 && code.length <= 17) {
      if (!code || !/^[a-zA-Z0-9]{5,17}$/.test(code)) {
        msg = '护照证件号码格式错误'
      } else {
        result = true
      }
    } else {
      msg = '护照证件号码长度要大于等于5位小于等于17位'
    }
  } else {
    msg = '护照证件号码不能为空'
  }
  return { valid: result, msg }
}
// 营业执照
function businessLicense(code) {
  let result = false
  let msg = ''
  if (typeof code === 'string') {
    if (code.length === 15 || code.length === 18) {
      if (
        !code ||
        !/(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(
          code
        )
      ) {
        msg = '营业执照号码格式错误'
      } else {
        result = true
      }
    } else {
      msg = '营业执照号码长度要等于15位或等于18位'
    }
  } else {
    msg = '营业执照号码不能为空'
  }
  return { valid: result, msg }
}
// 手机号码
function mobile(phone) {
  let result = false
  let msg = ''
  var isPhone = /^0\d{2,3}-?\d{7,8}$/
  //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  // var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/
  if (typeof phone === 'string') {
    if (phone.length === 11) {
      if (isPhone.test(phone)) {
        msg = '手机号码格式不正确'
      } else {
        result = false
      }
    } else {
      msg = '手机号码长度不为11位'
    }
  } else {
    msg = '手机号码不能为空'
  }
  return { valid: result, msg }
}
// 中文姓名
function cnName(name) {
  var regName = /^[\u4e00-\u9fa5]{2,4}$/
  if (!regName.test(name)) {
    return { valid: false, msg: '请输入中文姓名' }
  }
  return { valid: true, msg: '' }
}
// 金额
function price(options) {
  let opts = Object.assign(
    { fixed: 2, min: -Infinity, max: Infinity, len: 8 },
    options
  )
  let { fixed, min, max, len } = opts
  return function(target) {
    let r = ''
    if (fixed > 0) {
      r = `^-?\\d{1,${len}}(\\.\\d{1,${fixed}})?$`
      if (!new RegExp(r).test(target)) {
        return { valid: false, msg: `金额需不超过${len}位和${fixed}位小数` }
      }
    } else {
      r = `^-?\\d{1,${len}}$`
      if (!new RegExp(r).test(target)) {
        return { valid: false, msg: `金额需不超过${len}位` }
      }
    }
    let num = parseFloat(target)
    if (num < min) {
      return { valid: false, msg: `金额需不小于${min}` }
    }
    if (num > max) {
      return { valid: false, msg: `金额需不大于${max}` }
    }
    return { valid: true }
  }
}
export default {
  url,
  email,
  idCard,
  residencePermit,
  creditCode,
  chinagreenCard,
  militaryCard,
  homeReturnPermit,
  passport,
  businessLicense,
  mobile,
  cnName,
  price
}
