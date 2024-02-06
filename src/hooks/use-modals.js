import { useContext } from "react";
import { ModalContext } from "../store";

export const useModals = () => useContext(ModalContext);
