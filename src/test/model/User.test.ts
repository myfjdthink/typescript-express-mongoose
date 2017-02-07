/**
 * Created by nick on 2017/1/24.
 */
import {User} from "../../app/models/User";
import Logger from "../../Logger";
import * as should from "should";

describe('User Model CRUD', () => {
  const phone = '13457668733'
  const name = 'hh'
  it(' create ', async function () {
    const user = {phone: phone, real_name: name, createdAt: new Date()}
    const cUser = await User.create(user)
    Logger.info('result ', cUser);
    should.exist(cUser)
    cUser.phone.should.equal(phone)
    cUser.real_name.should.equal(name)
  });

  it(' find ', async function () {
    const fUser = await User.findOne({phone})
    console.log('result ', fUser);
    should.exist(fUser)
    fUser.phone.should.equal(phone)
    fUser.real_name.should.equal(name)
  });

  it(' update ', async function () {
    const newName = 'BB'
    const result = await User.update({phone}, {real_name: newName})
    console.log('result ', result);
    const fUser = await User.findOne({phone})
    console.log('result ', fUser);
    should.exist(fUser)
    fUser.phone.should.equal(phone)
    fUser.real_name.should.equal(newName)
  });

  it(' findOneAndUpdate ', async function () {
    const newName = 'BB2'
    const fUser = await User.findOneAndUpdate({phone}, {real_name: newName})
    console.log('result ', fUser);
    should.exist(fUser)
    fUser.phone.should.equal(phone)
    fUser.real_name.should.not.equal(newName)
  });

  it(' remove ', async function () {
    const result = await User.remove({phone})
    console.log('result ', result.result);
    const fUser = await User.findOne({phone})
    console.log('result ', fUser);
    should.not.exist(fUser)
  });

});