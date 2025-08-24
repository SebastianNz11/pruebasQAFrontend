import { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, userData);
      const { data } = response;
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/tasks", { replace: true });
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message[0]);
      } else {
        setError("Error al iniciar sesión");
      }
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, userData);
      const { data } = response;
      setMessage(data.message[0]);
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message[0]);
      } else {
        setError("Error al registrarse");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const logOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <GeneralContext.Provider
      value={{
        login,
        user,
        isAuthenticated,
        error,
        registerUser,
        message,
        loading,
        logOut,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
