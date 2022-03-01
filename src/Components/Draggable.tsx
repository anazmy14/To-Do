import React from "react";

interface Props {
  onDragStart: (evt: React.DragEvent) => void;
  children: JSX.Element;
}

const Draggable: React.FC<Props> = ({ onDragStart, children }) => {
  const onDragEnd = (evt: React.DragEvent) => {
    evt.currentTarget.classList.remove("dragged");
  };

  return (
    <div className="draggable" onDragStart={(e) => onDragStart(e)} onDragEnd={(e) => onDragEnd(e)} draggable>
      {children}
    </div>
  );
};

export default Draggable;
