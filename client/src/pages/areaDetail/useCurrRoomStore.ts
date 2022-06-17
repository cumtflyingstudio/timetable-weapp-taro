import usePiniadux from '../../piniadux/src/hooks/usePiniadux';

const form = Symbol('form');
export const useCurrRoomStore = () => {
  return usePiniadux(form, {
    state() {
      return {
        currentId: '',
        rooms: {} as Record<string, Room>,
      };
    },
  });
};
