import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [selDates, setSelectedDates] = useState([]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        type,
        setType,
        username,
        setUsername,
        open,
        setOpen,
        selDates,
        setSelectedDates,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
