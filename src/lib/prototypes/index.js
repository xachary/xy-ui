import common from '@/lib/prototypes/format/common.js'
import date from '@/lib/prototypes/format/date.js'
import number from '@/lib/prototypes/format/number.js'
//
import tool from '@/lib/prototypes/tool.js'
//
import validate from '@/lib/prototypes/validate.js'
//
import pop from '@/lib/prototypes/pop.js'

const formatTool = {
  currying: function (f) {
    let args = [...arguments]
    if (args.length > 1) {
      args.splice(0, 1)
    } else {
      args = undefined
    }
    return function (v) {
      if (args) {
        return f(v, ...args)
      }
      return f(v)
    }
  },
  combine: function (v, list) {
    let temp = v
    if (list && list.constructor === Array) {
      for (let i = 0; i < list.length; i++) {
        temp = list[i](temp)
      }
    }
    return temp
  }
}

export default {
  $xyFormat: { common, date, number, tool: formatTool },
  $xyTool: tool,
  $xyValidate: validate,
  $xyPop: pop
}
