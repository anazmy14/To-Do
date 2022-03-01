import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColumnType, StateType, ItemType } from "../types/types";
import { changeItemColumn } from "../actions/itemActions";
import Droppable from "./Droppable";
import Card from "./Card";

interface Props {
  id: string;
  column: ColumnType;
}

const Column: React.FC<Props> = ({ id, column }) => {
  const dispatch = useDispatch();
  const items = useSelector((state: StateType) =>
    state.items.filter((item) => item.columnId === id)
  );

  const handleDrop = (itemId: string, columnOrder: number) => {
    if (Math.abs(columnOrder - column.order) === 1) {
      dispatch(
        changeItemColumn({
          id: itemId,
          columnId: id,
        } as ItemType)
      );
    }
  };

  return (
    <div className="column">
      <h2>{column.name}</h2>
      <div>
        <Droppable onDrop={handleDrop}>
          <div data-testid={id}>
            {items.map((item) => {
              return (
                <Card key={item.id} item={item} columnOrder={column.order} />
              );
            })}
          </div>
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
