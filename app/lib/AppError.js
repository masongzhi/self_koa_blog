const util = require('util');

class AppError extends Error {
  constructor() {
    super();
    const args = Array.prototype.slice.call(arguments);
    let message = args[0];
    const params = args.slice(1);
    message = message || ErrorInfo.UNKNOWN_ERROR;
    if (params && params.length) {
      message = util.format(message, params);
    }
    this.code = 1;
    this.message = message;
  }
}

const ErrorInfo = {
  UNKNOWN_ERROR: '未知错误',
  NOT_EXIST: '%s不存在:%s',
  IS_DONE: '%s已经完成',
  FAIL: '%失败',
  BUSY: '系统繁忙，请一分钟后再试',
  MONGO_ERROR: '数据库错误',
  TYPE_ERROR: '服务器错误',
  PARAM_EMPTY: '参数不能为空',
};

AppError.ERRORS = ErrorInfo;
module.exports = AppError;
