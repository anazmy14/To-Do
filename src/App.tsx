import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { addItem, changeItemColumn, removeItem } from "./actions/itemActions";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import{State, Item } from "./types/types"
import Col from "./Components/Column";
import Modal from "./Components/InputModal";

function App() {
  const dispatch = useDispatch();
  const columns = useSelector((state:State) => state.columns);
  
  const onDragEnd = (result:DropResult) => {
 
    if (result.source && !result.destination ){
      removeItem({
        id : result.draggableId
      } as Item)
    }
    if(!result.destination) return

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
          id: result.draggableId ,
          columnId: destination.droppableId,
        } as Item)
      );
    } else {
    }
  };

  const handleAdd = (content:string) => {
    dispatch(
      addItem({
        id: uuid(),
        columnId: Object.keys(columns)[0],
        history: [`Created as "${content}"`],
        content,
      })
    );
  };

  return (
    <div className="app">
      <Modal onSubmit={handleAdd} />
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext onDragEnd={(result:DropResult) => onDragEnd(result)}>
          {Object.entries(columns).map(([key, col]) => (
            <Col key={key} id={key} column={col} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;