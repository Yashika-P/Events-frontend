import React, { useEffect, useState } from "react";
import { fetchEvents } from "../api";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const response = await fetchEvents();
      setEvents(response.data);
    };
    loadEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Event Schedules</h2>
      <ul className="mt-5">
        {events.map((event) => (
          <li key={event._id} className="border-b py-4">
            <h3 className="text-lg font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Price: ${event.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
