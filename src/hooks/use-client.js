import { useContext } from "react";
import { ClientContext } from "../store";

export const useClient = () => useContext(ClientContext);
