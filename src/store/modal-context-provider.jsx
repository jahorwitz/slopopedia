import { useState } from "react";
import { ModalContext } from "./modal-context";

export const ModalContextProvider = ({ children }) => {
  const [modalName, setModalName] = useState(null);
  const [modals, setModals] = useState({});

  const registerModal = (modalName, Component) => {
    setModals((prev) => ({ ...prev, [modalName]: Component }));
  };

  const openModal = (modalName) => {
    setModalName(modalName);
  };

  const closeModal = () => {
    setModalName("");
  };

  return (
    <ModalContext.Provider value={{ registerModal, openModal, closeModal }}>
      {modalName && modals[modalName]}
      {children}
    </ModalContext.Provider>
  );
};
