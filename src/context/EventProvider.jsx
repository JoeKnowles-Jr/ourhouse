import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const EventContext = createContext({});

export const useEvents = () => useContext(EventContext);

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const addEvent = async (event) => {
    event.created_at = new Date();
    event.updated_at = new Date();
    const { data, error } = await supabase
      .from("events")
      .insert(event)
      .select();
    if (data) {
      setEvents((prevEvents) => [...prevEvents, data[0]]);
      setMsg("Event Added Successfully");
    }
    if (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  const editEvent = async (event, id) => {
    const { data, error } = await supabase
      .from("events")
      .update(event)
      .eq("id", id)
      .select();
    if (error) {
      setErrorMsg(error.message);
      console.error(error);
    }
    if (data) {
      setMsg("Event Updated");
      const updatedEvents = events.map((event) => {
        if (id === event.id) {
          return { ...event, ...data[0] };
        }
        return event;
      });
      setEvents(updatedEvents);
    }
  };

  const deleteEvent = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setMsg("Event Deleted Successfully");
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== id)
      );
    }
  };

  const fetchAll = async () => {
    const { data, error } = await supabase.from("events").select();
    if (data) setEvents(data);
    if (error) setErrorMsg("Error in Fetching Events");
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        msg,
        setMsg,
        errorMsg,
        setErrorMsg,
        editEvent,
        deleteEvent
      }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;