import React, { useState, useEffect } from "react";
import api from "../api"; // Ensure this points to your API configuration file

const EventBooking = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data.events); // Assuming the backend returns { events: [...] }
      } catch (error) {
        console.error("Error fetching events:", error.response?.data || error.message);
      }
    };

    fetchEvents();
  }, []);

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedEvent || !userName || !email) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await api.post("/bookings", {
        event: selectedEvent,
        name: userName,
        email,
      });

      setPaymentStatus(response.data.message);
      alert("Booking Successful!");
    } catch (error) {
      console.error("Error during booking:", error.response?.data || error.message);
      setPaymentStatus("Booking failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Book Tickets</h2>
      <form onSubmit={handleBooking}>
        <div className="mb-4">
          <label htmlFor="event" className="block text-gray-700 font-bold mb-2">
            Select Event
          </label>
          <select
            id="event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">-- Select an Event --</option>
            {events.map((event) => (
              <option key={event._id} value={event.name}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Confirm Booking and Pay
        </button>
      </form>
      {paymentStatus && <p className="mt-4 text-center">{paymentStatus}</p>}
    </div>
  );
};

export default EventBooking;
