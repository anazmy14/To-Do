import React from "react";
import { useSelector } from "react-redux";
import { ColumnType, StateType } from "../types/types";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import Card from "./Card";

interface Props {
  id: string;
  column: ColumnType;
}

const Column: React.FC<Props> = ({ id, column }) => {
  const items = useSelector((state: StateType) =>
    state.items.filter((item) => item.columnId === id)
  );
  return (
    <div className="column">
      <h2>{column.name}</h2>
      <div>
        <Droppable droppableId={id} key={id}>
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
            return (
              <div
                className={
                  snapshot.isDraggingOver ? "list list-active" : "list"
                }
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((item, index) => {
                  return <Card key={item.id} item={item} index={index} />;
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
