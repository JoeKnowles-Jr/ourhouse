import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useShoppingLists } from "../../context/ShoppingListProvider";

const ConfirmShoppingListDeleteModal = ({ show, handleClose, id }) => {
  const [loading, setLoading] = useState(false);
  const { setErrorMsg, deleteShoppingList } = useShoppingLists();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      await deleteShoppingList(id);
    } catch (error) {
      console.error(error);
      setErrorMsg("Error in deleting the list");
    }
    setLoading(false);
    handleClose()
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="text-center" closeButton>
        <h2>Delete shopping list</h2>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to delete the list?</p>
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

export default ConfirmShoppingListDeleteModal;
