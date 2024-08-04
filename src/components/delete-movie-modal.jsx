import { useMutation } from "@apollo/client";
import { GET_MOVIES } from "../graphql";
import { DELETE_MOVIE } from "../graphql/mutations/";
import backArrow from "../images/back-arrow.svg";
import redX from "../images/red-x-button.svg";
import { Button } from "./button";
import { Modal } from "./modal";

export const DeleteMovieModal = ({ movieData, closeModal, currentUser }) => {
  const [deleteMovie, { data, loading, error }] = useMutation(DELETE_MOVIE, {
    refetchQueries: [GET_MOVIES],
  });

  const confirmDeleteMovie = (movieId) => {
    deleteMovie({
      variables: {
        where: { id: movieId },
      },
    }).then(() => {
      closeModal();
    });
  };

  return (
    <Modal>
      <div
        className="w-full px-[30px] pt-5 pb-[60px] flex flex-col gap-y-4 font-arial items-center"
        data-test-id="delete-modal-container"
      >
        <h1
          className="mt-4 font-bold text-2xl text-danger"
          data-test-id="delete-modal-h1"
        >
          Are you sure?
        </h1>
        <p
          className="font-bold text-center text-lg"
          data-test-id="delete-modal-confirmation"
        >
          {movieData.author && currentUser.id === movieData.author.id
            ? `You are about to delete your submission of ${movieData.title}.`
            : `You are about to delete ${
                movieData.author ? movieData.author.username : "a user"
              }'s submission of ${movieData.title}.`}
        </p>
        <p className="font-bold text-lg" data-test-id="delete-modal-p">
          This is irreversible!
        </p>
        <div className="flex gap-x-2.5">
          <div
            className="flex gap-x-5 mt-8 font-bold text-lg/4"
            data-test-id="delete-button-container"
          >
            <Button
              variant={"outline-secondary"}
              className="flex items-center gap-x-2.5 border border-solid border-black p-2.5 w-40"
              onClick={closeModal}
              disabled={loading}
              data-test-id="delete-button-cancel"
            >
              <img
                src={backArrow}
                className="w-8 h-8"
                data-test-id="delete-modal-img"
              />
              Cancel
            </Button>
            <Button
              size="sm"
              variant={"outline-danger"}
              className="flex items-center gap-x-2.5 border border-solid border-black p-2.5 w-40"
              onClick={() => confirmDeleteMovie(movieData.id)}
              data-test-id="delete-button-confirm"
            >
              <img
                src={redX}
                className="w-5 h-5"
                data-test-id="delete-modal-img"
              />
              {loading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
