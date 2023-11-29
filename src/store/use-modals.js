import { useContext } from "react";
import { ModalContext } from "./modal-context";

export const useModals = () => useContext(ModalContext);
