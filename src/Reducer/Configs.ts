/* eslint-disable import/no-anonymous-default-export */
import { ActionTypes, ConfigsReducer, UPDATE_CONFIGS } from "../Action/types";

const initialState: ConfigsReducer = {
  signedIn: false,
};

export default (state = initialState, action: ActionTypes): ConfigsReducer => {
  switch (action.type) {
    case UPDATE_CONFIGS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
