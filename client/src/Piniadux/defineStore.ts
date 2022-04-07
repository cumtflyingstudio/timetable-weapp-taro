import { useReducer } from "react";
import Observer from "./Observer";

interface IOption<IState extends Object> {
  state: () => IState;
}

/*
 *
 * @example
 * const store = defineStore("key", {
 *  state() {
 *   return {
 *      hello: 1,
 *    };
 *  },
 *});
 * */
// function defineStore<IState>(id: string, option: IOption<IState>) {
//   const observeStore = new Observer(option.state());
//   return { store: observeStore.proxyObj };
// }
const storeBucket = new Map();

function observe<IState>(id: string, option?: IOption<IState>) {
  let observeStore;
  if (storeBucket.has(id)) {
    observeStore = storeBucket.get(id);
  } else {
    observeStore = new Observer(option!.state());
    storeBucket.set(id, observeStore);
  }
  return observeStore;
}

function useStore<IState>(id: string, option?: IOption<IState>) {
  const observeStore = observe(id, option);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  observeStore.addTask(forceUpdate);
  return { store: observeStore.proxyObj };
}

// export default defineStore;
export { useStore };
