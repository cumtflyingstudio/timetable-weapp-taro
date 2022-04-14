const debounce = (fn) => {
  let timer: null | number = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn.apply(this, args);
    }, 50);
  };
};

type ValueOf<T> = T[keyof T];
type EffectFunc = () => (() => void) | void;
type PropertyKey = string | symbol;

class Observer<T extends Object> {
  private primaryObj: T;
  public proxyObj: T;

  private globalEffectFuncQueue = new Set<EffectFunc>();
  public reset: Function | undefined;

  constructor(obj: T) {
    const proxyObj = this.createProxy(obj);
    this.primaryObj = obj;
    this.proxyObj = proxyObj as T;
  }

  createProxy(obj: Object): T {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    const that = this;
    const proxyObj = new Proxy(obj, {
      get(target: T, p: keyof T): ValueOf<T> {
        return target[p];
      },
      set(target: T, p: keyof T, value: unknown): boolean {
        if (!Object.is(target[p], value)) {
          Reflect.set(
            target,
            p,
            typeof value === "object" && value !== null
              ? that.createProxy(value)
              : value
          );

          that.runTaskQueue();
        }
        return true;
      },
    });
    let key: keyof typeof obj;
    for (key in obj) {
      if (typeof obj[key] === "object") {
        obj[key] = this.createProxy(obj[key]) as any;
      }
    }
    return proxyObj as T;
  }

  initialize(obj: T) {
    const proxyObj = this.createProxy(obj) as T;
    this.primaryObj = obj;
    this.proxyObj = proxyObj;
    this.runTaskQueue();
  }

  addTask(Task: EffectFunc) {
    this.globalEffectFuncQueue.add(Task);
  }

  removeTask(Task: EffectFunc) {
    this.globalEffectFuncQueue.delete(Task);
  }

  runTaskQueue = debounce(function () {
    Promise.resolve().then(() => {
      this.globalEffectFuncQueue.forEach((F) => F());
    });
  });
}

export default Observer;
