import { Location, NavigateFunction, Params } from "react-router-dom";

export interface RouterHOCTypes {
  location: Location;
  navigate: NavigateFunction;
  params: Readonly<Params<string>>;
}

export interface GistResponseTypes {
  id: string;
  owner: { login: string; avatar_url: string };
  files: Array<{ content?: string }>;
  created_at: string;
  description: string;
}

export interface GistFile {
  file_id?: number;
  filename?: string;
  file_content?: string;
}

export interface GistTypes {
  description?: string;
  files: Record<string, { content: string }>;
  gist_id?: string;
  public?: boolean;
}

export interface InitialStateTypes {
  gists_list: Array<any>;
  profile_gists: Array<any>;
  selected_gist: any;
  page_number: number;
  gist_loading: boolean;
  profile_gists_loading: boolean;
  logged_in: boolean;
}

export enum ActionKind {
  GET_GIST_LIST = "GET_GIST_LIST",
  GET_PROFILE_GISTS = "PROFILE_GISTS",
  SELECT_GIST = "SELECT_GIST",
  SET_LOGIN_STATE = "SET_LOGIN_STATE",
  SET_PAGE_NUMBER = "SET_PAGE_NUMBER",
  START_GIST_LOADING = "START_GIST_LOADING",
  START_PROFILE_GISTS_LOADING = "START_PROFILE_GISTS_LOADING",
  STOP_GIST_LOADING = "STOP_GIST_LOADING",
  STOP_PROFILE_GISTS_LOADING = "STOP_PROFILE_GISTS_LOADING",
}
export type Action = {
  type: ActionKind;
  payload?: string | number | any | Array<any> | boolean;
};
