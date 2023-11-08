import { useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
