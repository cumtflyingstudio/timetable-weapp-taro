type ValueOf<T> = T[keyof T];

class Observer<T extends Object> {
  primaryObj: T;
  proxyObj: T;
  queue: (() => unknown)[] = [];

  constructor(obj: T) {
    const that = this;
    const proxyObj = new Proxy(obj, {
      get(target: T, p: keyof T): ValueOf<T> {
        console.log("劫持get");
        return target[p];
      },
      set(target: T, p: keyof T, value: unknown): boolean {
        Reflect.set(target, p, value);
        console.log("劫持set",target, p, value);
        that.queue.map((F) => F());
        return true;
      },
    });

    this.primaryObj = obj;
    this.proxyObj = proxyObj;
  }

  addTask(Task: () => unknown) {
    this.queue.push(Task);
  }
}

export default Observer;
