import React, { useState } from "react";
import { bookTicket } from "../api";

const TicketBookingForm = ({ token, events }) => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Please log in to book a ticket.");
      return;
    }

    try {
      const response = await bookTicket({ eventId: selectedEvent, seats }, token);
      setMessage(`Booking successful! Ticket ID: ${response.data._id}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to book ticket.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Book Tickets</h2>
      {message && <p className="text-center text-green-500 my-2">{message}</p>}
      <form onSubmit={handleBooking} className="bg-white p-6 shadow-lg rounded-lg">
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          required
          className="w-full p-2 my-2 border rounded"
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title} - ${event.price} per ticket
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          required
          className="w-full p-2 my-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Confirm Booking and Pay
        </button>
      </form>
    </div>
  );
};

export default TicketBookingForm;
