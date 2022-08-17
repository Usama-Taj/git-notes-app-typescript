import { GIST_INITIAL_STATE } from "constants/index";
import React, {
  ReactNode,
  createContext,
  useReducer,
  useEffect,
  Dispatch,
} from "react";
import { Action, InitialStateTypes } from "types";
import { setLoggedInState } from "./actions";
import reducer from "./reducer";

interface Props {
  children: ReactNode | ReactNode[];
}

export const GistContext =
  createContext<[InitialStateTypes, Dispatch<Action>]>(null);

export const GistProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, GIST_INITIAL_STATE);
  useEffect(() => {
    const logged_in_state =
      JSON.parse(localStorage.getItem("gist_app"))?.logged_in || false;

    dispatch(setLoggedInState(logged_in_state));
  }, []);
  return (
    <GistContext.Provider value={[state, dispatch]}>
      {children}
    </GistContext.Provider>
  );
};
