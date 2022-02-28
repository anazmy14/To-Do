import { createStore, Reducer, Store } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { v4 as uuid } from "uuid";
import itemReducer from "./reducers/itemReducer";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, itemReducer as Reducer);

const columns = {
  [uuid()]: {
    name: "To Do",
    order: 1,
  },

  [uuid()]: {
    name: "In Progress",
    order: 2,
  },

  [uuid()]: {
    name: "Done",
    order: 3,
  },
};

export default () => {
  let store = createStore(persistedReducer, {
    columns: columns,
    items: [],
  } as any);

  let persistor = persistStore(store as Store);
  return { store, persistor };
};
