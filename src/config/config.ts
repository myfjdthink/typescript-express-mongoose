/**
 * Created by nick on 2017/1/24.
 */
import * as _ from 'lodash'
const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 8000
let baseConfig = {
  app: {
    port: PORT,
  },
  baseUrl: 'http://localhost:' + PORT + '',
  db_uri: 'mongodb://joda:57017/user_koala'
}

const platformConfig = {}
baseConfig = _.merge(baseConfig, platformConfig[NODE_ENV])

export default baseConfig