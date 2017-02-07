/**
 * Created by nick on 2017/1/24.
 */
import config from '../../config/config';
import * as superagent from 'superagent'
import * as request from 'superagent-bluebird-promise'
import * as should from 'should'

describe.only('User Controller function', () => {
  it('should return hello world', function (done) {
    superagent.get(config.baseUrl + '/user/findOne').end(function (err, res) {
      should.not.exist(err)
      const result = JSON.parse(res.text);
      console.log('result ', result);
      should.exist(result)
      done();
    });
  });

  it('should return hello world 2 ', async function () {
    const res = await request.get(config.baseUrl + '/user/findOne')
    const result = JSON.parse(res.text);
    console.log('result ', result);
    should.exist(result)
  });
});