import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, editItem } from "../actions/itemActions";
import Draggable from "./Draggable";
import InputModal from "./InputModal";
import HistoryModal from "./HistoryModal";
import { BsTrash } from "react-icons/bs";
import { ItemType } from "../types/types";

interface Props {
  item: ItemType;
  columnOrder: number;
}

const Card: React.FC<Props> = ({ item, columnOrder }) => {
  const dispatch = useDispatch();
  const handleEdit = (content: string) => {
    dispatch(
      editItem({
        id: item.id,
        content,
      } as ItemType)
    );
  };
  const handleDragStart = (evt: React.DragEvent) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("itemId", item.id);
    evt.dataTransfer.setData("columnOrder", String(columnOrder));
    evt.dataTransfer.effectAllowed = "move";
  };

  const handleRemove = () => {
    dispatch(removeItem(item));
  };

  return (
    <Draggable onDragStart={handleDragStart}>
      <div  data-testid={item.id}>
        {item.content}
        <div>
          <InputModal
            edit={true}
            onSubmit={handleEdit}
            initialTextValue={item.content}
          />

          <button onClick={handleRemove}>
            <BsTrash className="icon" />
          </button>
          <HistoryModal itemHistory={item.history} />
        </div>
      </div>
    </Draggable>
  );
};
export default Card;
