import { usePiniadux, persistByKey } from "piniadux";

const TOKEN = Symbol("TOKEN");
const useTokenStore = () =>
  usePiniadux(TOKEN, {
    state() {
      return { token: "" };
    },
  });

export default useTokenStore;
