const tracer = require('tracer')
const config = require('config')

const logger = tracer.dailyfile({
  root: config.get('root') + '/log',
  maxLogFiles: 10,
  allLogsFileName: config.get('application') + '-' + config.get('port') + '-all',
  level: config.get('isProd') ? 'info' : 'debug',
  transport: function (data) {
    console.log(data.output)
  }
})

module.exports = logger
