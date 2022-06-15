import { usePiniadux } from "piniadux";

const TOKEN = Symbol("TOKEN");
const useTokenStore = () =>
  usePiniadux(TOKEN, {
    state() {
      return { token: "", };
    },
  });

export default useTokenStore;
