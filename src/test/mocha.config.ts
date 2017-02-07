/* eslint-env mocha */
'use strict'

process.env.NODE_ENV = 'test'
import app from '../app';
import Logger from '../Logger';
import mongoose = require('mongoose');
mongoose.set('debug', true);
function ObjectId(id) {
  return new mongoose.Types.ObjectId(id)
}
global['ObjectId'] = ObjectId

before(async function () {
  this.timeout(2000)
  const conection = app.initialize()
  await dropDB(conection)
  Logger.info(' 清空 DB 完成');
})

after(function (done) {
  // app.server.close(done)
  done()
  console.info('test closed server and exit!')
})

/**
 * 清空测试 DB
 * @param db
 * @returns {Promise<any|U|Model<any>|Model<string>>[]}
 */
function dropDB(db) {
  const mNames = db.modelNames()
  console.info('will clear db collection : ', mNames)
  const Models = mNames.map((m) => db.model(m))
  return Models.map(dropCollection)
}
function dropCollection(Model) {
  return new Promise(function (resolve, reject) {
    Model.collection.drop(function (err) {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}