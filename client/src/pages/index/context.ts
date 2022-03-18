import { getStorageSync, setStorageSync } from "@tarojs/taro";
import { createContext, useContext, useReducer } from "react";

const lifeKey = "@organizations";
const initialState = getStorageSync(lifeKey) || {
  applicationList_added: [] as Application[]
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "addApplication":
      const newState = {
        ...state,
        applicationList_added: state.applicationList_added.concat(payload)
      };
      setStorageSync(lifeKey, newState);
      return newState;

    default:
      return state;
  }
};

export const useListReducer = (): ReturnType<typeof useReducer> => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};
export const context = createContext(
  {} as {
    state: typeof initialState;
    dispatch: React.Dispatch<{
      type: any;
      payload: any;
    }>;
  }
);
export const useListContext = () => {
  return useContext(context);
};
