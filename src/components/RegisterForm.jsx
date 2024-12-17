import React, { useState } from "react";
import { registerUser } from "../api";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage(`Registration successful: ${response.data.name}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      {message && <p className="text-center text-green-500 my-2">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full p-2 my-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 my-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 my-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
