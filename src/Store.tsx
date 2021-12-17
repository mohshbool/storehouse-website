import { applyMiddleware, createStore, Store } from "redux";
import { persistStore } from "redux-persist";
import Thunk from "redux-thunk";
import persistedReducer from "./Reducer/index";

export const store = createStore(
  persistedReducer,
  applyMiddleware(Thunk)
) as Store;

export const persistor = persistStore(store);
