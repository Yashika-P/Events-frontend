import React, { useEffect, useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import EventList from "./components/EventList";
import TicketBookingForm from "./components/TicketBookingForm";
import { fetchEvents } from "./api";
import Header from "./components/Header";  // Import the Header component

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const response = await fetchEvents();
      setEvents(response.data);
    };
    loadEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Header />  {/* Use the Header component */}
      
      {!token && (
        <>
          <RegisterForm />
          <LoginForm setToken={(t) => { setToken(t); localStorage.setItem("token", t); }} />
        </>
      )}
      {token && (
        <>
          <EventList />
          <TicketBookingForm token={token} events={events} />
        </>
      )}
    </div>
  );
};

export default App;
