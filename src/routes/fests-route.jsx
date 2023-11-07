import { useEffect } from "react";
import { Button } from "../components";
import { MoviePreview } from "../components/MoviePreviewModal";
import { useModals } from "../store/useModals";

export function FestsRoute() {
  const { registerModal, closeModal, openModal } = useModals();

  useEffect(() => {
    registerModal("preview", <MoviePreview closeModal={closeModal} />);
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
