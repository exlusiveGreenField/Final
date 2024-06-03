import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
  const { user: authUser, token } = useAuth();
  const [user, setUser] = useState(authUser);

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/Client/up/${id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfileContext.Provider value={{ user, updateUser }}>
      {children}
    </ProfileContext.Provider>
  );
};