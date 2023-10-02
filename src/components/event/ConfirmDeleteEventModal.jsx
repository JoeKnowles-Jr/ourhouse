import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useEvents } from "../../context/EventProvider";

const ConfirmEventDeleteModal = ({ show, handleClose, id }) => {
  const [loading, setLoading] = useState(false);
  const { setErrorMsg, deleteEvent } = useEvents();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      await deleteEvent(id);
    } catch (error) {
      console.error(error);
      setErrorMsg("Error in deleting the item");
    }
    setLoading(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="text-center" closeButton>
        <h2>Delete event</h2>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to delete the event?</p>
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

export default ConfirmEventDeleteModal;
