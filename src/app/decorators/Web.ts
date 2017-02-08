/**
 * Created by nick on 16/6/4.
 */
import BaseController from "../controllers/common/BaseController";

export class RouterMap {
  static decoratedRouters: Map<{target: any, method: string, path: string}, Function | Function[]> = new Map()
}
export function router(route?: string) {
  return (target: BaseController, name: string, value: PropertyDescriptor) => {
    if (!route) {
      const controller = target.constructor.name
      const controllerName = controller.toLowerCase().replace('controller', '')
      route = 'all ' + ['', controllerName, name].join('/')
    }
    const split = route.split(' ');
    if (split.length > 2) {
      throw new Error('路由中只允许一个空格')
    }
    const [method, path] = split
    RouterMap.decoratedRouters.set({
      target: target,
      path: path,
      method: method
    }, target[name])
  }
}