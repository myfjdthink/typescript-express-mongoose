/**
 * Created by nick on 2017/1/24.
 */
import config from '../../config/config';
import * as request from 'superagent-bluebird-promise'
import * as should from 'should'

describe('User Controller function', () => {
  it(' find one user ', async function () {
    const res = await request.get(config.baseUrl + '/user/findOne').query({ud: '558113908d1797b03c938fc8'})
    const result = JSON.parse(res.text);
    console.log('result ', result);
    should.exist(result)
  });

  it(' create a user ', async function () {
    let phone = '12345678';
    let realName = 'John';
    const res = await request.post(config.baseUrl + '/user/create')
      .send({
        phone: phone,
        real_name: realName
      })
    const result = JSON.parse(res.text);
    console.log('result ', result);
    should.exist(result)
    should.equal(result.phone, phone)
    should.equal(result.real_name, realName)
  });
});