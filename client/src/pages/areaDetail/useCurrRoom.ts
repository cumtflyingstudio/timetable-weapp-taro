import usePiniadux from "../../piniadux/src/hooks/usePiniadux";

const currRoom = Symbol("currRoom");
export const useCurrRoom = () => {
  return usePiniadux(currRoom, {
    state() {
      return {
        current: 0,
        rooms: [] as Room[],
      };
    },
  });
};
