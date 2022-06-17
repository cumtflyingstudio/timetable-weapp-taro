import usePiniadux from '../../piniadux/src/hooks/usePiniadux';

const currRoom = Symbol('currRoom');
export const useForm = () => {
  return usePiniadux(currRoom, {
    state() {
      return {
        date: Date.now(),
        startTime: '12:00',
        endTime: '12:00',
        applyInfo: '',
      };
    },
  });
};
