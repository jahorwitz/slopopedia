import { useEffect } from "react";
import { Button } from "../components";
import { MoviePreviewModal } from "../components/MoviePreviewModal";
import { useModals } from "../hooks";

export function FestsRoute() {
  const { registerModal, closeModal, openModal } = useModals();

  useEffect(() => {
    registerModal(
      "preview",
      <MoviePreviewModal closeModal={closeModal} buttons whiteButton />
    );
  }, []);

  return (
    <>
      {/* <Fests /> */}
      This is the fests page
      <Button
        onClick={() => {
          openModal("preview");
        }}
      >
        CLICK ME
      </Button>
    </>
  );
}
