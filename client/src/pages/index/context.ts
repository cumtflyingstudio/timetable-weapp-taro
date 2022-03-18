import { createContext, useContext, useReducer } from "react";

const initialState = {
  applicationList_added: [] as Application[]
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "addApplication":
      return {
        ...state,
        applicationList_added: state.applicationList_added.concat(payload)
      };

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
