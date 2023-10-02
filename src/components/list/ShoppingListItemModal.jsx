import { useRef, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useShoppingListItems } from "../../context/ShoppingListItemsProvider";
import { useAuth } from "../../context/AuthProvider";

const ShoppingListItemModal = ({ show, handleClose, type, shoppingListItem, shoppingListId }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const { addShoppingListItem, editShoppingListItem, setErrorMsg } = useShoppingListItems();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (
        !nameRef.current?.value
      ) {
        alert("Please enter item!");
        return;
      }
      const shoppingListItemToSave = {
        added_by: user.id,
        list: shoppingListId,
        name: nameRef.current.value,
        description: descriptionRef.current.value
      };
      if (type === "Edit") {
        await editShoppingListItem(shoppingListItemToSave, shoppingListItem.id)
      } else {
        await addShoppingListItem(shoppingListItemToSave);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="text-center" closeButton>
        <h2>{type} ShoppingListItem</h2>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={nameRef}
                  defaultValue={shoppingListItem?.name ?? ""}
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group id="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  ref={descriptionRef}
                  defaultValue={shoppingListItem?.description ?? ""}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={loading} variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ShoppingListItemModal;


