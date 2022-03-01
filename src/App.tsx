import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { addItem } from "./actions/itemActions";
import { StateType, ItemType } from "./types/types";
import Col from "./Components/Column";
import Modal from "./Components/InputModal";

function App() {
  const dispatch = useDispatch();
  const columns = useSelector((state: StateType) => state.columns);
  const handleAdd = (content: string) => {
    dispatch(
      addItem({
        id: uuid(),
        columnId: Object.keys(columns)[0],
        history: [`Created as "${content}"`],
        content,
      } as ItemType)
    );
  };

  return (
    <div className="app">
      <Modal onSubmit={handleAdd} />
      <div
      className="container"
      >
        {Object.entries(columns).map(([key, column]) => (
          <Col key={key} id={key} column={column} />
        ))}
      </div>
    </div>
  );
}

export default App;
