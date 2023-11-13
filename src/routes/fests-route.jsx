import { useEffect } from "react";
import { Button } from "../components";
import { MoviePreviewModal } from "../components/MoviePreviewModal";
import { useModals } from "../store/useModals";

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
        title="CLICK ME"
        className="bg-yellow-200 h-12 text-black text-center items-center w-80 border py-2 px-4"
        onClick={() => {
          openModal("preview");
        }}
      />
    </>
  );
}
