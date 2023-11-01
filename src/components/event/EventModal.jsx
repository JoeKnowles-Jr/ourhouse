import { useRef, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useEvents } from "../../context/EventProvider";

const EventModal = ({ show, handleClose, type, event, userId, date }) => {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef(null);
  const dateRef = useRef(new Date());
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);
  const timeRef = useRef(null);
  const { addEvent, setErrorMsg } = useEvents();

  event.amount = (event.amount /= 100).toFixed(2)

  const handleSubmit = async (e) => {
    console.log("SUBMIT");
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (
        !nameRef.current?.value ||
        !dateRef.current?.value ||
        !amountRef.current?.value ||
        !timeRef.current?.value ||
        !descriptionRef.current?.value
      ) {
        alert("Please fill in all the fields");
        return;
      }
      const eventToSave = {
        user_id: userId,
        name: nameRef.current.value,
        date: date || dateRef.current.value,
        amount: amountRef.current.value * 100,
        time: timeRef.current.value,
        description: descriptionRef.current.value
      };
      console.log(eventToSave);
      if (type === "Edit") {
        await editEvent(eventToSave)
      } else {
        await addEvent(eventToSave);
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
        <h2>{type} Event</h2>
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
                  defaultValue={event?.name ?? ""}
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group id="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  ref={dateRef}
                  defaultValue={event?.date ?? ""}
                  required
                />
              </Form.Group>
              <Form.Group id="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  ref={descriptionRef}
                  defaultValue={event?.description ?? ""}
                  required
                />
              </Form.Group>
              <Form.Group id="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="currency"
                  ref={amountRef}
                  defaultValue={event?.amount ?? ""}
                  required
                />
              </Form.Group>
              <Form.Group id="recurring">
                <Form.Label>Recurring</Form.Label>
                <Form.Control
                  type="radio"
                  // ref={}
                  // defaultValue={(event?.amount) ?? ""}
                  required
                />
              </Form.Group>
              <Form.Group id="time">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  ref={timeRef}
                  defaultValue={event?.time ?? ""}
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

export default EventModal;


