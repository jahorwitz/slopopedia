import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = useEffect(() => {
    setLoggedIn(true);
  });

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
