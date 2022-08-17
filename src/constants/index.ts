import { InitialStateTypes } from "types";

export const WHITE = "#FFF";
export const GREEN = "#5acba1";
export const LIGHTGREEN = "#60e0b2";
export const BLACK = "#000";
export const GREY = "#666";
export const RED = "#FF0000";
export const BLUE = "#58a6ff";
// Gist Reducer Initial State

export const GIST_INITIAL_STATE: InitialStateTypes = {
  gists_list: [],
  profile_gists: [],
  selected_gist: {},
  page_number: 1,
  gist_loading: true,
  profile_gists_loading: true,
  logged_in: false,
};
