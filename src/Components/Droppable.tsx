import React from "react";

interface Props {
  onDrop: (itemId: string, columnOrder: number) => void;
  children: JSX.Element;
}

const Droppable: React.FC<Props> = ({ onDrop, children }) => {
  const onDragEnter = (evt: React.DragEvent) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  const onDragLeave = (evt: React.DragEvent) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt: React.DragEvent) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };
  const handleDrop = (evt: React.DragEvent) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    const itemId = evt.dataTransfer.getData("itemId");
    const columnOrder = Number(evt.dataTransfer.getData("columnOrder"));
    onDrop(itemId, columnOrder);
  };
  return (
    <div
      className="droppoable" 
      onDragLeave={(e) => onDragLeave(e)}
      onDragEnter={(e) => onDragEnter(e)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => handleDrop(e)}
    >
      {children}
    </div>
  );
};

export default Droppable;
