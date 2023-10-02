import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTodos } from "../../context/TodoProvider";

const ConfirmTodoDeleteModal = ({ show, handleClose, id }) => {
  const [loading, setLoading] = useState(false);
  const { setErrorMsg, deleteTodo } = useTodos();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
      setErrorMsg("Error in deleting the todo");
    }
    setLoading(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="text-center" closeButton>
        <h2>Delete Todo</h2>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to delete the todo?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button disabled={loading} variant="danger" onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmTodoDeleteModal;
