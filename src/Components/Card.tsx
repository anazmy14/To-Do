import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, editItem } from "../actions/itemActions";
import { Draggable } from "react-beautiful-dnd";
import InputModal from "./InputModal";
import HistoryModal from "./HistoryModal";
import { BsTrash } from "react-icons/bs";
import { ItemType } from "../types/types";

interface Props {
  item: ItemType;
  index: number;
}

const Card: React.FC<Props> = ({ item, index }) => {
  const dispatch = useDispatch();
  const handleEdit = (content: string) => {
    dispatch(
      editItem({
        id: item.id,
        content,
      } as ItemType)
    );
  };
  const handleRemove = () => {
    dispatch(removeItem(item));
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided: any, snapshot: any) => {
        return (
          <div
            className="card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
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
        );
      }}
    </Draggable>
  );
};
export default Card;
