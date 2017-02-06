/**
 * Created by nick on 16/5/20.
 */
import e = require('express');
import BaseController from './common/BaseController';
import Const from '../lib/Const';
import {router} from '../decorators/Web';
import User from '../models/User';

class UserController extends BaseController {
  @router({path: '/user/create', method: Const.HTTP_METHOD.POST})
  async create(req: e.Request, res: e.Response) {
    const user = req.body
    console.log('UserAccountController', 'create ', user);
    const c_user = await User.create(user)
    console.log('UserAccountController', 'create result', c_user);
    res.send(c_user);
  }
}
export default UserController