import usePiniadux from '../../piniadux/src/hooks/usePiniadux';
import momentFormat from '../../utils/momentFormat';

const currRoom = Symbol('currRoom');
export const useForm = () => {
  return usePiniadux(currRoom, {
    state() {
      const now = momentFormat(new Date(), 'HH:mm');
      return {
        date: Date.now(),
        startTime: now,
        endTime: now,
        applyInfo: '',
      };
    },
  });
};
