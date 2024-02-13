import { useContext } from "react";
import { CurrentUserContext } from "./current-user-context";

export const useCurrentUser = () => useContext(CurrentUserContext);
