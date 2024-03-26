import { useState } from "react";
import { ModalContext } from "./modal-context";

//TO USE MODALS:
//Deconstruct openModal & closeModal from useModal in your component
//Pass the modal component you'd liketo use with props to openModal in handler function
//Call handler function wherever you'd like to open the modal

export const ModalContextProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (modalElement) => {
    setModalContent(modalElement);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalContent}
    </ModalContext.Provider>
  );
};
