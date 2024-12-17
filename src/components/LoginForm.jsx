import React, { useState } from "react";
import { loginUser } from "../api";

const LoginForm = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      setToken(response.data.token); // Store token in state or localStorage
      setMessage("Login successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      {message && <p className="text-center text-red-500 my-2">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
