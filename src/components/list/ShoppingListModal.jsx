import { useRef, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useShoppingLists } from "../../context/ShoppingListProvider";
import { useAuth } from "../../context/AuthProvider";

const ShoppingListModal = ({ show, handleClose, type, shoppingList }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const storeRef = useRef(null);
  const { addShoppingList, setErrorMsg } = useShoppingLists();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (
        !storeRef.current?.value
      ) {
        alert("Please select store!");
        return;
      }
      const shoppingListToSave = {
        created_at: new Date(),
        updated_at: new Date(),
        store: storeRef.current.value,
        added_by: user.id
      };
      if (type === "Edit") {
        // Yet to implement
      } else {
        await addShoppingList(shoppingListToSave);
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
        <h2>{type} ShoppingList</h2>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form.Group id="store">
                <Form.Label>Store</Form.Label>
                <Form.Control
                  type="text"
                  ref={storeRef}
                  defaultValue={shoppingList?.store ?? ""}
                  required
                  autoFocus
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

export default ShoppingListModal;


