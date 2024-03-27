import { useEffect } from "react";
import { Footer, SubmitSlopForm } from "../../components";
import { Header } from "../../components/header";
import { MoviePreviewModal } from "../../components/MoviePreviewModal";
import { useModals } from "../../hooks";

export const SubmitRoute = ({ children }) => {
  const { registerModal, closeModal } = useModals();
  useEffect(() => {
    registerModal(
      "preview",
      <MoviePreviewModal closeModal={closeModal} howToWatch whiteButton />
    );
  }, []);
  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <SubmitSlopForm />
      <Footer />
    </>
  );
};
