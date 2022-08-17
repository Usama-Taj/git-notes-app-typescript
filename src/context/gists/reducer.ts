import {
  GET_GIST_LIST,
  SELECT_GIST,
  SET_LOGIN_STATE,
  SET_PAGE_NUMBER,
  STOP_GIST_LOADING,
  START_GIST_LOADING,
  GET_PROFILE_GISTS,
  START_PROFILE_GISTS_LOADING,
  STOP_PROFILE_GISTS_LOADING,
} from "context/actionTypes";
import { Action, InitialStateTypes } from "types/index";

export default (
  state: InitialStateTypes,
  action: Action
): InitialStateTypes => {
  switch (action.type) {
    case GET_GIST_LIST:
      return { ...state, gists_list: action.payload };
    case SELECT_GIST:
      return { ...state, selected_gist: action.payload };
    case START_PROFILE_GISTS_LOADING:
      return { ...state, profile_gists_loading: true };
    case STOP_PROFILE_GISTS_LOADING:
      return { ...state, profile_gists_loading: false };
    case STOP_GIST_LOADING:
      return { ...state, gist_loading: false };
    case START_GIST_LOADING:
      return { ...state, gist_loading: true };
    case SET_PAGE_NUMBER:
      return { ...state, page_number: action.payload };
    case GET_PROFILE_GISTS:
      return { ...state, profile_gists: action.payload };
    case SET_LOGIN_STATE:
      return { ...state, logged_in: action.payload };
    default:
      return state;
  }
};
