import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Keyword } from "../components";
import { MoviePreviewModal } from "../components/MoviePreviewModal";
import { GET_FESTS } from "../graphql/get-fests";
import { useModals } from "../store/use-modals";

export function FestsRoute() {
  const { registerModal, closeModal, openModal } = useModals();
  const { data, error, loading } = useQuery(GET_FESTS);

  console.log(data?.fests);

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
      {data?.fests.map((fest, index) => (
        <Link key={index} to={`/fests/${fest.id}`}>
          <Keyword keyword={fest.name} />
        </Link>
      ))}
    </>
  );
}
