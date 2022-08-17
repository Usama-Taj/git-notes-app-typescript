import { Action, ActionKind } from "types/index";

export const getGistList = (payload: object[]): Action => ({
  type: ActionKind.GET_GIST_LIST,
  payload,
});

export const getProfileGists = (payload: object[]): Action => ({
  type: ActionKind.GET_PROFILE_GISTS,
  payload,
});

export const setSelectedGist = (payload: object): Action => ({
  type: ActionKind.SELECT_GIST,
  payload,
});

export const setPageNumber = (payload: number): Action => ({
  type: ActionKind.SET_PAGE_NUMBER,
  payload,
});

export const startProfileGistLoading = (): Action => ({
  type: ActionKind.START_PROFILE_GISTS_LOADING,
});

export const stopProfileGistLoading = (): Action => ({
  type: ActionKind.STOP_PROFILE_GISTS_LOADING,
});

export const startGistLoading = (): Action => ({
  type: ActionKind.START_GIST_LOADING,
});

export const stopGistLoading = (): Action => ({
  type: ActionKind.STOP_GIST_LOADING,
});

export const setLoggedInState = (payload: boolean): Action => ({
  type: ActionKind.SET_LOGIN_STATE,
  payload,
});
