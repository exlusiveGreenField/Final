import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        fetchUser(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Client/get/${userId}`
      );

      setUser(response.data);

      setRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user information", error);
    }
  };

  const loginAction = async (data, str) => {
    try {
      const response = await axios
        .post(`http://localhost:5000/${data.role}/${str}`, data)
        .then((response) => {
          setUser(response.data.data.userName);
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.data.userName)
          );
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setRole(response.data.data.role);
          localStorage.setItem("role", JSON.stringify(response.data.data.role));
          if(role==="admin") navigate('/dashboard')
         else  navigate("/");
        });
    } catch (err) {
      console.error(err);
      if (err.response.data && err.response.data.message) {
        console.error(err.response.data.message);
      } else {
        console.error("An error occurred during login.");
      }
    }
  };

  const logOut = () => {
    setUser({});
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
