import * as _ from 'lodash';
import { AppError, Logger } from '../lib';

export default pattern => {
  return async (ctx, next) => {
    const reg = new RegExp(pattern);
    // 符合相应规则才格式化返回 例如: ^/api
    if (!reg.test(ctx.originalUrl)) return await next();

    try {
      await next();
      return responseFormatter(ctx);
    } catch (error) {
      if (error instanceof AppError) {
        Logger.info('业务逻辑错误 ', error);
        ctx.status = 200;
        ctx.body = {
          code: error.code,
          message: error.message,
        };
      } else if (error.isJoi) {
        Logger.info('参数校验错误 ', error);
        const msg = error.details.map(item => item.message).join(',');
        ctx.status = 200;
        ctx.body = {
          code: -1,
          message: msg,
        };
      } else {
        Logger.error('系统内部错误 ', error);
        ctx.status = 200;
        ctx.body = {
          code: 1,
          message: error.message,
        };
      }
    }

    function responseFormatter(ctx) {
      // excel
      if (ctx.type === 'text/csv') {
        return;
      }
      const body = ctx.body;
      ctx.status = 200;
      if (_.isString(body)) {
        ctx.body = {
          code: 0,
          message: body,
        };
      } else if (body && !_.isNil(body.code)) {
        ctx.body = body;
      } else {
        ctx.body = {
          code: 0,
          message: 'success',
          data: body,
        };
      }
    }
  };
};
