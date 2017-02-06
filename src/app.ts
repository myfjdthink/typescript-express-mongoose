/**
 * Created by nick on 16/6/4.
 */
import ServerLoader from './ServerLoader';
if (!module.parent) {
  ServerLoader.initialize()
}
export default ServerLoader