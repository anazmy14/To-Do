import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsPencilSquare } from "react-icons/bs";

interface Props {
  onSubmit: (textVaue: string) => void;
  edit?: boolean;
  initialTextValue?: string;
}

const InputModal: React.FC<Props> = ({
  onSubmit,
  edit = false,
  initialTextValue = "",
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(initialTextValue);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };
  const handleSubmit = () => {
    onSubmit(textValue);
    handleClose();
    setTextValue("")
  };

  return (
    <>
      {edit ? (
        <button onClick={handleShow}>
          <BsPencilSquare className="icon" />
        </button>
      ) : (
        <Button variant="success" size="lg" onClick={handleShow}>
          {" "}
          Add Todo{" "}
        </Button>
      )}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            size="lg"
            type="text"
            value={textValue}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}  disabled={textValue.length < 1} >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InputModal;
