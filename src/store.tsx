import { createStore, Reducer, Store } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { columns} from "./constants";
import itemReducer from "./reducers/itemReducer";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, itemReducer as Reducer);

export default () => {
  let store = createStore(persistedReducer, {
    columns: columns,
    items: [],
  } as any);

  let persistor = persistStore(store as Store);
  return { store, persistor };
};
