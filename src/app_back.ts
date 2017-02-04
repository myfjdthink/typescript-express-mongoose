const fs = require('fs');
const path = require('path');
const join = require('path').join;
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

import mongoose = require('mongoose');
import express = require('express');
const port = process.env.PORT || 3000;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

import routes from './config/routes'

routes(app)

// Bootstrap models
const models = join(__dirname, 'app/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));


connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen() {
  if (app.get('env') === 'test') return;
  app.listen(port);
  //import Order from './app/models/Order'
  //async function main() {
  //  let kittens = await Order.findById2('54ce6d7779337f164b36504a')
  //  console.log('kittens', kittens);
  //}
  //
  //function main2() {
  //  Order.findById2('54ce6d7779337f164b36504a').then(function (order) {
  //    console.log('aaaa', order.amount);
  //    console.log('aaaa', order);
  //  }).catch(function (err) {
  //    console.log('aaaa err', err);
  //  })
  //}
  //
  //main()
  //main2()

  //async function main() {
  //  console.log('hehe', user.findOne({}).exec);
  //  let kittens = await user.findOne({}).exec()
  //  console.log('kittens', kittens);
  //}
  //main()
  console.log('Express app started on port ' + port);
}

function connect() {
  const options = {server: {socketOptions: {keepAlive: 1}}};
  return mongoose.connect('mongodb://localhost:57017/user_koala', options).connection;
}


module.exports = app;
