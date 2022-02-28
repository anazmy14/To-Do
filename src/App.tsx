import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { addItem, changeItemColumn, removeItem, swapItems } from "./actions/itemActions";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { StateType, ItemType } from "./types/types";
import Col from "./Components/Column";
import Modal from "./Components/InputModal";

function App() {
  const dispatch = useDispatch();
  const columns = useSelector((state: StateType) => state.columns);

  const onDragEnd = (result: DropResult) => {
    if (
      result.source &&
      !result.destination &&
      columns[result.source.droppableId].order === Object.keys(columns).length
    ) {
      dispatch(
        removeItem({
          id: result.draggableId,
        } as ItemType)
      );
    }
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      if (
        Math.abs(
          columns[source.droppableId].order -
            columns[destination.droppableId].order
        ) > 1
      )
        return;

      dispatch(
        changeItemColumn({
          id: result.draggableId,
          columnId: destination.droppableId,
        } as ItemType)
      );
    } else {
      dispatch(
        swapItems({
          id: result.draggableId,
          currentIndex: source.index,
          indexToMove: destination.index,
        } as ItemType)
      )
    }
  };

  const handleAdd = (content: string) => {
    dispatch(
      addItem({
        id: uuid(),
        columnId: Object.keys(columns)[0],
        history: [`Created as "${content}"`],
        content,
      } as ItemType )
    );
  };

  return (
    <div className="app">
      <Modal onSubmit={handleAdd} />
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
          {Object.entries(columns).map(([key, column]) => (
            <Col key={key} id={key} column={column} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
