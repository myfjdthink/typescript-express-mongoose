/* eslint-env mocha */
'use strict'

process.env.NODE_ENV = 'test'
import app from "../app";
import config from "../config/config";
import mongoose = require("mongoose");
mongoose.set('debug', true);
function ObjectId(id) {
  return new mongoose.Types.ObjectId(id)
}
global['ObjectId'] = ObjectId

before(function () {
  this.timeout(10000)
  console.info('test is listening port: ' + config.app.port)
  app.initialize()
  // const databaseHelper = require('./helper/database')
  // await databaseHelper.drop()
  // // 初始化数据
  // await databaseHelper.initData()
  // require('./helper/nock')()
})

after(function (done) {
  //app.server.close(done)
  done()
  console.info('test closed server and exit!')
})
