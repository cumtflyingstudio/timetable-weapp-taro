import { getStorageSync, setStorageSync } from '@tarojs/taro';
import { createContext, useContext, useReducer } from 'react';

const lifeKey = '@organizations';

type State = {
  applicationList_added: Application[];
};

const initialState: State = getStorageSync(lifeKey) || {
  applicationList_added: [] as Application[],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'addApplication':
      const newState = {
        ...state,
        applicationList_added: state.applicationList_added.concat(payload),
      };
      setStorageSync(lifeKey, newState);
      return newState;

    case 'deleteApplication':
      const index = state.applicationList_added.findIndex(
        (item) => item._id === payload,
      );
      const applicationList_added =
        index !== -1
          ? [
              ...state.applicationList_added.slice(0, index),
              ...state.applicationList_added.slice(index + 1),
            ]
          : state.applicationList_added;

      const newStateAfterDelete = {
        ...state,
        applicationList_added,
      };
      setStorageSync(lifeKey, newStateAfterDelete);
      return newStateAfterDelete;

    default:
      return state;
  }
};

export const useListReducer = () => {
  // @ts-ignore FIXME
  return useReducer(reducer, initialState);
};
export const context = createContext({
  state: initialState,
  dispatch: () => {},
} as {
  state: typeof initialState;
  dispatch: React.Dispatch<{
    type: any;
    payload: any;
  }>;
});
export const useListContext = () => {
  return useContext(context);
};
