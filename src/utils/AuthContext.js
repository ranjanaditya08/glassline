import React, { createContext, useContext, useEffect, useState } from 'react';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDto = JSON.parse(localStorage.getItem("user"));
    
    if(userDto){
      setUser(userDto);
    }
    
    if (token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const login = () => {
    if(localStorage.getItem("token")){
      setIsAuthenticated(true);
    }
  };
  const logout = () => {
    
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    setIsAuthenticated(false);
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
