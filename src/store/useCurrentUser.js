import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

export const useCurrentUser = () => useContext(CurrentUserContext);
