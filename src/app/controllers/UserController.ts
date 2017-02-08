/**
 * Created by nick on 16/5/20.
 */
import e = require('express');
import BaseController from './common/BaseController';
import Const from '../lib/Const';
import Logger from '../../Logger';
import {router} from '../decorators/Web';
import {User} from '../models/User';

class UserController extends BaseController {
  @router({path: '/user/create', method: Const.HTTP_METHOD.POST})
  async create(req: e.Request, res: e.Response) {
    const user = req.body
    console.log('UserAccountController', 'create ', user);
    const cUser = await User.create(user)
    console.log('UserAccountController', 'create result', cUser);
    res.send(cUser);
  }

  @router({
    method: 'get',
    path: '/user/findOne'
  })
  async findOne(req: e.Request, res) {
    const ud = req.query.ud
    Logger.info('ud ', ud)
    let result = await User.findById(ud);
    res.send(result);
  }
}
export default UserController