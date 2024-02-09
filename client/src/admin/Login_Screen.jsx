// LoginForm.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/log_screen.css";
import axiosInstance from "./AxiosInstance";
import { handleHttpError } from "./HTTP_Status_handler";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    try {
      const result = await axiosInstance.get(
        "http://localhost:3001/admin/authenticate"
      );
      console.log(result);
      if (result.status === 200) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log("Error authenticating user:", error);
      handleHttpError(error, () => alert("Login First"));
      console.log("Error authenticating user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Login failed. Please check your username and password."
        );
      }

      const { accessToken, refreshToken } = await response.json();

      // Store access token and refresh token in local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("Login successful:", { accessToken, refreshToken });
      alert("Login Successful");
      navigate("/admin/dashboard");
      // Handle successful login (redirect, display message, etc.)
    } catch (error) {
      setError("Invalid username or password !");
      console.error("Login failed:", error);
      // Handle login error (display error message, clear form, etc.)
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginScreen;
