/* eslint-disable import/no-anonymous-default-export */
import { ActionTypes, UserReducer, SET_USER } from "../Action/types";

const initialState: UserReducer = {};

export default (state = initialState, action: ActionTypes): UserReducer => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};
