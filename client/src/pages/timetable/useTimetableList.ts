import { usePiniadux } from '../../piniadux/src/hooks/usePiniadux';
import type { IForm } from '../../service/user/getRoomUsing';

export const useTimetableList = () => {
  return usePiniadux('timetableList', {
    state() {
      return {
        forms: [] as IForm[],
        currForm: null as null | IForm,
      };
    },
  });
};
