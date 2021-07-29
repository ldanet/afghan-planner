import { createContext, Dispatch, FC, useReducer } from "react";
import { reducer, initialState, Action } from "../reducer";

export const StateContext = createContext({
  dispatch: (() => {}) as Dispatch<Action>,
  state: initialState,
});

export const StateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
