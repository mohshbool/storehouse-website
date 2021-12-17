import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { ActionTypes } from "../Action/types";
import Configs from "./Configs";
import User from "./User";

const rootReducer = combineReducers({ Configs, User });

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState, ActionTypes>(
  {
    key: "Sager-Storehouse",
    storage,
  },
  rootReducer
);

export default persistedReducer;
