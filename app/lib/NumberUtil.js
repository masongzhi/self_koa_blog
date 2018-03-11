const _ = require('lodash')
const ObjectId = require('mongoose').Types.ObjectId

class NumberUtil {
  static fixedFloat (number, byte) {
    if (!number) {
      return 0
    }
    // sails.log.debug('number', number)
    if (!byte) {
      byte = 2
    }
    return parseFloat(number.toFixed(parseInt(byte)))
  }

  static fixedFloatPro (number) {
    var left = Math.abs(number - this.fixedFloat(number))
    // 是 0.34999999999 的情况才 fix
    if (left < 0.00001) {
      return this.fixedFloat(number)
    }
    return number
  }

  static cutFloat (number, digits) {
    if (!number || digits < 0) return number
    digits = digits || 2
    number = this.fixedFloatPro(number)
    const isMinus = (number < 0)
    if (isMinus) {
      number = number * -1
    }
    const result = this.fixedFloatPro(_.floor(number, digits))
    return result * (isMinus ? -1 : 1)
  }

  /**
   * 把 object 里的 所有浮点类型的数值cut到5位小数
   * @param obj
   * @return {Object}
   */
  static cutAll (obj) {
    const that = this
    return _.mapValues(obj, function (val, key) {
      // 数组就遍历递归
      if (_.isArray(val)) {
        for (var index in val) {
          if (_.isObject(val[index])) {
            val[index] = that.cutAll(val[index])
          }
        }
        return val
      }

      // 过滤 ObjectId
      if (_.isObject(val) && val instanceof ObjectId) {
        return val
      }

      // 对象就递归 注意 数组也是 Object 所有数组的判断要放前面
      if (_.isObject(val)) {
        return that.cutAll(val)
      }

      // 过滤非数字属性
      if (!that.isFloat(val)) {
        return val
      }
      return that.cutFloat(val, 5)
    })
  }

  /**
   * 是否是浮点数
   */
  static isFloat (n) {
    return Number(n) === n && n % 1 !== 0
  }

  /**
   * 计算利息
   */
  static calEarning (principal, rate, term) {
    return this.cutFloat(principal * rate * term / 365)
  }

  static closeToZero (a) {
    return a < 0.05
  }

  static toZero (num) {
    if (this.closeToZero(num)) {
      return 0
    }
    return num
  }

  static thousandBitSeparator (number, {digits = 2, symbol = ',', force = false} = {}) {
    if ((number && _.isNil(number)) || !number) {
      return number
    }
    number = this.cutFloat(number, digits)
    const arr = number.toString().split('.')
    arr[0] = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + symbol)
    if (force && arr[1]) {
      arr[1] = Number('0.' + arr[1]).toFixed(2).split('.')[1]
    }
    return arr.join('.')
  }

  static toPercent (number) {
    if (_.isNil(number)) {
      return number
    }
    return this.cutFloat(number * 100) + '%'
  }
}

module.exports = NumberUtil
