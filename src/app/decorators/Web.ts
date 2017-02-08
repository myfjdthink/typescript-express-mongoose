/**
 * Created by nick on 16/6/4.
 */

export class RouterMap {
  static decoratedRouters: Map<{target: any, method: string, path: string}, Function | Function[]> = new Map()
}
export function router(config: {path: string, method?: string}) {
  return (target: any, name: string, value: PropertyDescriptor) => {
    // console.log('ServerLoader', ServerLoader);
    RouterMap.decoratedRouters.set({
      target: target,
      path: config.path,
      method: config.method
    }, target[name])
  }
}