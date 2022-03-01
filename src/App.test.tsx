import React from 'react';
import { v4 as uuid } from "uuid";
import { fireEvent, render, screen } from '@testing-library/react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from './reducers/itemReducer'
import App from './App';
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

const initialState = {
  columns : columns,
  items: [
    {
      id : uuid(),
      columnId : Object.keys(columns)[0],
      content : "test",
      history : []
    }
  ]  
}

const store = createStore(reducer as any , initialState);
const renderWithProvider = (Component:React.FC ) => {
  return(
    render(
  <Provider store={store}>
    <Component/>
  </Provider>
    )
  )
}




  