/* eslint-env mocha */

const supertest = require('supertest-as-promised')
const app = require('../index.js')
const Logger = require('../app/lib/Logger')

process.env.NODE_ENV = 'test'

// const fixtureStatus = new Set()
beforeEach(async function () {
  // 必须全部表都清
  const dbs = require('../config/initializer/index').dbs
  for (let db of dbs.values()) {
    for (let key of Object.keys(db.collections)) {
      await db.collections[key].remove()
    }
  }
  const dataFile = this.currentTest.file.replace('.test.js', '.data.js')
  Logger.info(dataFile)
  // if (fixtureStatus.has(dataFile)) {
  //   return
  // }
  let data = {}
  try {
    data = require(dataFile)
    //  fixtureStatus.add(dataFile)
  } catch (err) {
    Logger.info('No need to init data: ', dataFile)
    return
  }
  if (!data) {
    Logger.info('no data', dataFile)
    return
  }
  // 加载数据
  for (const d of data) {
    await d.model.create(d.items)
  }
})

after(async () => {
  app.close()
})

/**
 * 测试工具
 */
module.exports = {
  request: supertest.agent(app)
}
