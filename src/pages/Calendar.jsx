import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { Button, Table } from "react-bootstrap";
import Calendar from "react-calendar";
import "../Calendar.scss"
import { useEvents } from "../context/EventProvider";
import DayDetail from "../components/event/DayDetail";
import EventModal from "../components/event/EventModal";
import ConfirmDeleteEventModal from "../components/event/ConfirmDeleteEventModal"

const OurCalendar = () => {
    const { user } = useAuth();
    const { events } = useEvents();
    const [showEventModal, setShowEventModal] = useState(false);
    const [showAllEvents, setShowAllEvents] = useState(false);
    const [currentDate, onChange] = useState(new Date());
    const [type, setType] = useState("");
    const [activeEvent, setActiveEvent] = useState({});
    const [currentDay, setCurrentDay] = useState();
    const [showDeleteEventConfirmModal, setShowDeleteEventConfirmModal] = useState(false);

    const calendarEvents = events.reduce((acc, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = [];
        }
        acc[curr.date].push(curr);
        return acc;
      }, {});

      const tileClassName = ({ date, view }) => {
        const cellDate = formatDate(date)
        // Check if a date is in the past
        if (calendarEvents[cellDate]) {
          return 'past-date';
        }
        // Check if a date is today
        if (date === new Date()) {
          return 'today';
        }
        // Check if a date is in the future
        if (date > new Date()) {
          return 'future-date';
        }
      };

    useEffect(() => {
        const newDate = formatDate(currentDate)
        const dayEvents = events.filter(event => {
            return event.date == newDate
        })
        setCurrentDay({
            date: newDate,
            events: dayEvents
        })
    }, [currentDate])

    const handleAdd = () => {
        setType("Add");
        setShowEventModal(true);
    };

    const closeEventModal = () => {
        setActiveEvent({});
        setShowEventModal(false);
        setType("");
    };

    const closeConfirmDeleteEventModal = () => {
        setActiveEvent({});
        setShowDeleteEventConfirmModal(false);
    };

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    return (
        <div>
            <EventModal
                show={showEventModal}
                handleClose={closeEventModal}
                type={type}
                event={activeEvent}
                userId={user.id}
            />
            <ConfirmDeleteEventModal
                show={showDeleteEventConfirmModal}
                handleClose={closeConfirmDeleteEventModal}
                id={activeEvent.id}
            />
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around"
            }}>
                <div style={{ fontSize: "24px", width: "50%", margin: "0 auto" }}>
                    <Calendar
                        onChange={onChange}
                        value={currentDate}
                        className="react-calendar"
                        tileClassName={tileClassName}
                    />
                    <div className="button-bar" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <i className="bi bi-plus-circle" onClick={handleAdd} />
                    </div>
                </div>
                {showAllEvents && <div style={{ fontSize: "17px", width: "50%", margin: "0 auto" }}>
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
                            {events.map((event, idx) => {
                                return (
                                    <tr style={{ border: "1px solid black" }} key={idx}>
                                        <td>{event.name}</td>
                                        <td>{event.date}</td>
                                        <td>{event.time}</td>
                                        <td>{event.amount}</td>
                                        <td>{event.description}</td>
                                        <td className="d-flex flex-row justify-content-around">
                                            <i
                                                className="bi bi-pencil-square icon"
                                                onClick={() => {
                                                    setActiveEvent(event);
                                                    setType("Edit");
                                                    setShowEventModal(true);
                                                }}></i>
                                            <i
                                                className="bi bi-trash icon"
                                                onClick={() => {
                                                    setActiveEvent(event);
                                                    setShowDeleteEventConfirmModal(true);
                                                }}></i>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>}
            </div>

            <div>
                <DayDetail day={currentDay} userId={user.id} />
            </div>
        </div>
    );
};

export default OurCalendar;