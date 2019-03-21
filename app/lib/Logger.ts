import * as tracer from 'tracer';
import * as config from 'config';

const logger = tracer.dailyfile({
  root: config.get('root') + '/log',
  maxLogFiles: 10,
  allLogsFileName: config.get('application') + '-' + config.get('port') + '-all',
  level: config.get('isProd') ? 'info' : 'debug',
  transport: function(data) {
    console.log(data.output);
  },
});

export default logger;
