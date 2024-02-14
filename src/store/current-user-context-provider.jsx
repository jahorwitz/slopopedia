import { useState } from "react";
import { CurrentUserContext } from "./current-user-context";

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
