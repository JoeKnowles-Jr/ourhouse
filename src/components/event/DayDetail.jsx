import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import EventModal from "../../components/event/EventModal";
import ConfirmDeleteEventModal from "../../components/event/ConfirmDeleteEventModal"

const DayDetail = ({ day, userId }) => {

    const [type, setType] = useState("")
    const [activeEvent, setActiveEvent] = useState({})
    const [showAddEvent, setShowAddEvent] = useState(false)
    const [showConfirmEventDelete, setShowConfirmEventDelete] = useState(false)

    const handleAdd = () => {
        setType("Add");
        setShowAddEvent(true);
    };

    const closeEventModal = () => {
        setActiveEvent({});
        setShowAddEvent(false);
        setType("");
      };
    
      const closeConfirmModal = () => {
        setActiveEvent({});
        setShowConfirmEventDelete(false);
      };

    return (<div style={{
        border: "1px solid black",
        padding: "10px"
    }}>
        <div className="d-flex flex-row justify-content-between">
            <h3>{day && day.date && day.date.toString()}</h3>

            {day && !day.events[0] && <div>
                <h2>No events!</h2>
            </div>}
            <Button onClick={() => handleAdd()}>Add Event</Button>
        </div>

        <EventModal
            show={showAddEvent}
            handleClose={closeEventModal}
            type={type}
            event={activeEvent}
            userId={userId}
            date={ day ? day.date : null}
        />
        <ConfirmDeleteEventModal
            show={showConfirmEventDelete}
            handleClose={closeConfirmModal}
            id={activeEvent.id}
        />

        {day && day.events[0] && <div>
            <Table
                striped
                bordered
                responsive
                variant="dark"
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {day.events.map((event, idx) => {
                        return (
                            <tr style={{ border: "1px solid black" }} key={idx}>
                                <td>{event.name}</td>
                                <td>{event.date}</td>
                                <td>{event.time}</td>
                                <td>${event.amount / 100}</td>
                                <td>{event.description}</td>
                                <td className="d-flex flex-row justify-content-around">
                                    <i
                                        className="bi bi-pencil-square icon"
                                        onClick={() => {
                                            setActiveEvent(event);
                                            setType("Edit");
                                            setShowAddEvent(true);
                                        }}></i>
                                    <i
                                        className="bi bi-trash icon"
                                        onClick={() => {
                                            setActiveEvent(event);
                                            setShowConfirmEventDelete(true);
                                        }}></i>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>}

    </div>)


}

export default DayDetail;

