/**
 * Created by nick on 16/5/20.
 */
import e = require('express');
import {Order} from "../models/Order";
import {router} from "../decorators/Web";
import BaseController from "../controllers/common/BaseController";


const timeOut = function (time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(`respond with asynv await ${time} ms`)
    }, time)
  });
};

class OrderController extends BaseController{
  @router()
  async awaitTest(req: e.Request, res) {
    console.log('OrderController', 'awaitTest');
    let result = await timeOut(10);
    res.send(result);
  }

  @router()
  async findOneWithClass(req: e.Request, res: e.Response) {
    let result = await Order.findById('54ce6d7779337f164b36504a')
    result.amount
    res.status(200).json(result);
  }

}

export default OrderController