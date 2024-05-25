import usePiniadux from '../piniadux/src/hooks/usePiniadux';

const usePiniaduxUserInfo = () =>
  usePiniadux('', {
    state() {
      return {
        username: '',
        phone: '',
        nickname: '',
      };
    },
  });

export { usePiniaduxUserInfo };
