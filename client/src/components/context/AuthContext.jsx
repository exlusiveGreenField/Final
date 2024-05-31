import React, { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider=({ children }) =>{
  console.log(children);
  const [user, setUser] = useState(localStorage.getItem('user') || {});
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const navigate = useNavigate();

  const loginAction = async (data,str) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/${data.role}/${str}`,
        data
      ).then((response)=>{
        console.log(response);
        setUser(response.data.data.userName);
        localStorage.setItem('user', JSON.stringify(response.data.data.userName)); 
        setToken(response.data.token);
        console.log('hey');
        localStorage.setItem('token', response.data.token);
        setRole(response.data.data.role);
        localStorage.setItem('role', JSON.stringify(response.data.data.role));
        
         navigate('/');})
     
        
        
      
    } catch (err) {
      console.error(err);
      if (err.response.data && err.response.data.message) {
        console.error(err.response.data.message);
      } else {
        console.error('An error occurred during login.');
      }
    }
  };

  const logOut = () => {
    setUser({});
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
