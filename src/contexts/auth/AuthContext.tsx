import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {props.children}
    </AuthContext.Provider>
  );
};
