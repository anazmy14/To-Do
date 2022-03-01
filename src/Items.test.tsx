import React from "react";
import { v4 as uuid } from "uuid";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { createStore, Store } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/itemReducer";
import {addItem} from "./actions/itemActions"
import App from "./App";
import { ItemType } from "./types/types";
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
  columns: columns,
  items: [],
};

let store:Store; 
const renderWithProvider = (Component: React.FC) => {
  store = createStore(reducer as any, initialState);
  return render(
    <Provider store={store}>
      <Component />
    </Provider>
  );
};


interface Data {
  itemId: string;
  columnOrder: string;
}

const transferData: Data = {
  itemId: "",
  columnOrder: "",
};
const moveItem = (from: HTMLElement, to: HTMLElement, currentColIndex:number, difference:number)=>{
  const mockdt = {
    setData: jest.fn(
      (key: keyof Data, data: string) => (transferData[key] = data)
    ),
    getData: jest.fn((key: keyof Data) => transferData[key]),
  };
  const cardId = uuid()
  store.dispatch(
    addItem({
      id: cardId,
      columnId: Object.keys(columns)[currentColIndex],
      content: "test",
      history: ["created as test"],
    } as ItemType)
  );
  const card = screen.getByTestId(cardId);
  const currentColItemsCountBefore = from.childElementCount;
  const targetColItemsCountBefore = to.childElementCount;
  fireEvent.dragStart(card, { dataTransfer: mockdt });
  fireEvent.dragOver(to, { dataTransfer: mockdt });
  fireEvent.dragEnd(to, { dataTransfer: mockdt });
  fireEvent.drop(to, { dataTransfer: mockdt });   
  expect(currentColItemsCountBefore - from.childElementCount).toEqual(difference);
  expect(
    to.childElementCount - targetColItemsCountBefore).toEqual(difference);
}


describe("move card", () => {
  let toDoCol: any;
  let inProgressCol: any;
  let doneCol: any;

  beforeEach(() => {
    renderWithProvider(App);
    toDoCol = screen.getByTestId(Object.keys(columns)[0]);
    inProgressCol = screen.getByTestId(Object.keys(columns)[1]);
    doneCol = screen.getByTestId(Object.keys(columns)[2]);
  });

  afterEach(() => {
    cleanup();
  });

  it("moves from to-do to in progress", ()=>{
    moveItem(toDoCol, inProgressCol, 0, 1)
  })

  it("moves from in progress to done", ()=>{
    moveItem(inProgressCol, doneCol, 1, 1)
  })

  it("moves from done to in progress", ()=>{
    moveItem(doneCol, inProgressCol, 2, 1)
  })
  it("moves from in progress to to-do", ()=>{
    moveItem(inProgressCol, toDoCol, 1, 1)
  })

  it("doesn't move from to-do to done", ()=>{
    moveItem(toDoCol, doneCol, 0, 0)
  })

  it("doesn't move from done to to-do", ()=>{
    moveItem(doneCol, toDoCol, 0, 0)
  }) 
});
