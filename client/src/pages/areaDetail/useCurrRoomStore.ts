import usePiniadux from "../../piniadux/src/hooks/usePiniadux";

const currRoom = Symbol("currRoom");
export const useCurrRoomStore = () => {
  return usePiniadux(currRoom, {
    state() {
      return {
        currentId: "",
        rooms: {} as Record<string, Room>,
      };
    },
  });
};
