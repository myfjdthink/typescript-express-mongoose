import mongoose = require('mongoose');
import * as express from 'express';
const bodyParser = require('body-parser');
import Logger  from './Logger';
import {RouterMap} from './app/decorators/Web';
import config from './config/config';

// let a = express.Router()
const fs = require('fs');
const join = require('path').join;
const port = config.app.port;
class ServerLoader {
  // static __DecoratedRouters:Map<{target:any, method:string, path:string}, Function | Function[]> = new Map()
  private router: any
  private app: express.Application

  constructor() {
    this.app = express()
    this.router = null
  }

  start() {
    return this.connectDB()
      .on('error', Logger.error)
      .on('disconnected', Logger.error)
      .once('open', Logger.info);
  }

  connectDB() {
    const options = {server: {socketOptions: {keepAlive: 1}}};
    const uri = config.db_uri;
    Logger.info(`connect to  ${uri} ...`);
    return mongoose.connect(uri, options).connection;
  }

  config() {
    Logger.info('config...');
    this.errorHandle()
    this.initMiddleware()
    this.initControllers()
    this.registerRouters()
  }

  initMiddleware() {
    Logger.info('initMiddleware...');
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));

    const middlewares = join(__dirname, 'app/middlewares');
    fs.readdirSync(middlewares)
      .filter(file => ~file.search(/^[^\.].*\.js$/))
      .forEach(file => {
        Logger.info('use middleware ', file);
        this.app.use(require(join(middlewares, file)))
      });
  }

  errorHandle() {
    this.app.use(function (err, req, res, next) {
      Logger.error(err.stack);
      res.status(500).send('Something broke!');
    });
  }

  /**
   * 把所有 controller require 一遍
   */
  initControllers() {
    Logger.info('Bootstrap controllers...');
    const controllers = join(__dirname, 'app/controllers');
    fs.readdirSync(controllers)
      .filter(file => ~file.search(/^[^\.].*\.js$/))
      .forEach(file => require(join(controllers, file)));
  }

  /**
   * 注册路由
   */
  registerRouters() {
    Logger.info('registerRouters...');
    for (let [config, controller] of RouterMap.__DecoratedRouters) {
      let controllers = Array.isArray(controller) ? controller : [controller]
      controllers.forEach((controller) => {
        Logger.info('find router', config.method || 'all', config.path, controller.name);
        this.app[config.method || 'all'](config.path, controller);
      })
    }
    Logger.info('registerRouters... completed');
  }

  listen() {
    this.config()
    this.app.listen(port)
    Logger.info('Server is listening port: ' + config.app.port)
    Logger.info(config.baseUrl)
  }

  static initialize() {
    Logger.info('Initialize server')
    const loader = new ServerLoader()
    const db = loader.start()
    loader.listen()
    return db
  }
}

export default ServerLoader