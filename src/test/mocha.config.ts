/* eslint-env mocha */
'use strict'

process.env.NODE_ENV = 'test'
const fs = require('fs');
import ServerLoader from '../ServerLoader';
import Logger from '../Logger';
import mongoose = require('mongoose');
mongoose.set('debug', true);
function ObjectId(id) {
  return new mongoose.Types.ObjectId(id)
}
export {ObjectId}

before(async function () {
  this.timeout(2000)
  const conection = ServerLoader.initialize()
  try {
    await dropDB(conection)
    await fixture(conection)
  } catch (err) {
    Logger.error('初始化测试环境出错 ', err.stack)
  }
  Logger.info(' 清空 DB 完成');
})

after(function (done) {
  // app.server.close(done)
  done()
  console.info('test closed server and exit!')
})

/**
 * 准备测试数据
 * @param connection
 * @returns {Promise<void>}
 */
async function fixture(connection) {
  let fixtureDir = __dirname + '/fixtures';
  Logger.info('fixture directories', fixtureDir)
  let files = fs.readdirSync(fixtureDir)
  for (const file of files) {
    if (file.indexOf('.data.js') < 0) {
      continue
    }
    if (file.indexOf('.js.map') > -1) {
      continue
    }
    const filename = __dirname + '/fixtures/' + file
    Logger.info('Initialize ' + filename)
    const data = require(filename)
    Logger.info('Initialize data ', data)
    for (const model of Object.keys(data)) {
      try {
        // Logger.info(`Initialize data ${model} items `, data[model].items)
        await connection.model(model).create(data[model].items)
      } catch (err) {
        Logger.info('Initialize data {{model}} items err', err.stack)
      }
    }
  }
}
/**
 * 清空测试 DB
 * @param db
 * @returns {Promise<any|U|Model<any>|Model<string>>[]}
 */
function dropDB(db) {
  const mNames = db.modelNames()
  console.info('will clear db collection : ', mNames)
  const models = mNames.map((m) => db.model(m))
  return models.map(dropCollection)
}
function dropCollection(model) {
  return new Promise(function (resolve, reject) {
    model.collection.drop(function (err) {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}