/**
 * Created by nick on 16/5/20.
 */
import e = require('express');
import BaseController from './common/BaseController';
import {router} from '../decorators/Web';
import Order from '../models/Order'

const timeOut = function (time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(`respond with asynv await ${time} ms`)
    }, time)
  });
};

class UserAccountController extends BaseController {
  @router({
    method: 'get',
    path: '/user/login'
  })
  async aotoRoute(req: e.Request, res) {
    var id = req.query.id;
    var abc = req.param('abc');
    console.log('UserAccountController', 'aotoRoute', id, abc);
    let result = await timeOut(10);
    res.send(result);
  }

  @router({
    method: 'post',
    path: '/user/findOne'
  })
  async findOne(req: e.Request, res) {
    console.log('UserAccountController', 'findOne');
    let result = await Order.findById('54ce6d7779337f164b36504a');
    const amount = result.amount
    console.log('amount', amount);
    res.send(result);
  }

  @router({path: '/user/findOne2', method: 'get'})
  async findOne2(req: e.Request, res: e.Response) {
    console.log('UserAccountController', 'findOne');
    let result = await Order.findById('54ce6d7779337f164b36504a');
    let result2 = await Order.findOne({uid: '558113908d1797b03c938fc8'})
    const oType = result.oType
    console.log('oType', oType);
    console.log('result2', result2);
    res.send(result2);
  }
}

// const user = new UserAccountController()
export default UserAccountController