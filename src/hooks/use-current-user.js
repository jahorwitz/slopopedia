import { useContext } from "react";
import { CurrentUserContext } from "../store";

export const useCurrentUser = () => useContext(CurrentUserContext);
