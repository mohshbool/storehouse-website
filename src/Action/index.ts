import {
  ActionTypes,
  ConfigsReducer,
  UPDATE_CONFIGS,
  SET_USER,
  UserReducer,
} from "./types";

export const updateConfigs = (configs: ConfigsReducer): ActionTypes => ({
  type: UPDATE_CONFIGS,
  payload: configs,
});

export const setUser = (user: UserReducer): ActionTypes => ({
  type: SET_USER,
  payload: user,
});
