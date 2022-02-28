import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import storeConfig from "./store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
const { persistor, store } = storeConfig();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
