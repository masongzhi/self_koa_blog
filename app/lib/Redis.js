const Promise = require('bluebird')
const redis = Promise.promisifyAll(require('redis'))
const config = require('config')
const client = redis.createClient(config.database.redis.port, config.database.redis.host, {auth_pass: config.database.redis.password})

module.exports = client
