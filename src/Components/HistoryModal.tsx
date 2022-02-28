import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BsClockHistory } from "react-icons/bs";

interface Props {
  itemHistory: Array<string>;
}

const HistoryModal: React.FC<Props> = ({ itemHistory }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>
        <BsClockHistory className="icon" />
      </button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemHistory.map((item) => (
            <li key={uuid()}> {item} </li>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HistoryModal;
