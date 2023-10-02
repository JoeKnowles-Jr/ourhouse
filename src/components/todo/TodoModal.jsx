import { useRef, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useTodos } from "../../context/TodoProvider";
import { useAuth } from "../../context/AuthProvider";

const TodoModal = ({ show, handleClose, type, todo }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const titleRef = useRef(null);
  const priorityRef = useRef(null);
  const descriptionRef = useRef(null);
  const { addTodo, editTodo, setErrorMsg } = useTodos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (
        !titleRef.current?.value ||
        !priorityRef.current?.value ||
        !descriptionRef.current?.value
      ) {
        alert("Please fill in all the fields");
        return;
      }
      const todoToSave = {
        title: titleRef.current.value,
        priority: priorityRef.current.value,
        description: descriptionRef.current.value,
        added_by: user.id,
        meant_for: user.id
      };
      if (type === "Edit") {
        await editTodo(todoToSave)
      } else {
        await addTodo(todoToSave);
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
        <h2>{type} Todo</h2>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form.Group id="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  ref={titleRef}
                  defaultValue={todo?.title ?? ""}
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group id="priority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  type="text"
                  ref={priorityRef}
                  defaultValue={todo?.priority ?? ""}
                  required
                />
              </Form.Group>
              <Form.Group id="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  ref={descriptionRef}
                  defaultValue={todo?.description ?? ""}
                  required
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

export default TodoModal;


