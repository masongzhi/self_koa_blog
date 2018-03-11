const Moment = require('moment-timezone')
Moment.tz.setDefault('Asia/Shanghai')

module.exports = {
  /**
   * Get current time's Moment object with timezone,
   * if not pass timezone, use the app's default timezone
   *
   * @param {String} timezone
   * @return {Object} the Moment object
   */
  getCurrentMoment: function (time) {
    return new Moment(time)
  },

  /**
   * Get current time of type Date
   *
   * @param {String} timezone
   * @return {Date} current time
   */
  getCurrentTime: function (time) {
    return self.getCurrentMoment(time).toDate()
  },

  /**
   * Get current time of type timestamp
   *
   * @param {String} timezone
   * @return {Integer} current time
   */
  getCurrentTimestamp: function (time) {
    return self.getCurrentMoment(time).valueOf()
  },

  // 返回日期0点的时间戳，time可以是时间戳或者date
  getStartOfDay: function (time) {
    return Moment(time).startOf('day').valueOf()
  },

  formatTime: function (time, format = 'YYYY-MM-DD HH:mm:ss') {
    // formatTime是一个处理格式方法，不应产生数据源
    if (!time) {
      throw new Error('formatTime方法应该传入参数time')
    }
    return Moment(time).format(format)
  },

  /**
   *
   * @param currentTime 当前的时间
   * @param day 是否加减日期
   * @returns {number}返回的是当日零点的时间戳
   */
  getDateTimestamp (currentTime, day) {
    return this.getCurrentMoment(currentTime || new Date()).add(day, 'day').startOf('day').valueOf()
  },
  diff (start_time, end_time, type) {
    const start = this.getCurrentMoment(start_time)
    const end = this.getCurrentMoment(end_time)
    const day = end.diff(start, type || 'days')
    return day
  }
}
const self = module.exports
