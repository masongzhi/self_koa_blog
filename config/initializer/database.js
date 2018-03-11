const config = require('config')
const mongoConfigs = config.get('database.mongodb')
const DEBUG_FLAG = config.get('database.mongoDebug')
const logger = require('../../app/lib/Logger')

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.set('debug', DEBUG_FLAG)
let dbs = new Map()

function createConnection (url, options = {}) {
  const db = mongoose.createConnection(url, options)

  db.on('error', err => {
    err.message = `[mongoose]${err.message}, ${url}`
    logger.error(err)
  })

  db.on('disconnected', () => {
    logger.error(`[mongoose] ${url} disconnected`)
  })

  db.on('connected', () => {
    logger.info(`[mongoose] ${url} connected successfully`)
  })

  db.on('reconnected', () => {
    logger.info(`[mongoose] ${url} reconnected successfully`)
  })

  return db
}

for (let c of mongoConfigs) {
  dbs.set(c.name, createConnection(c.url, c.options))
}

module.exports = dbs
