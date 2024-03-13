import { useQuery } from "@apollo/client";
import {
  Button,
  DeleteMovieModal,
  MovieCard,
  MoviePreviewModal,
} from "../../../components/";
import { GET_MOVIES } from "../../../graphql";
import { useModals } from "../../../hooks";
import checkIcon from "../../../images/check-mark-dark.svg";
import pencilIcon from "../../../images/pencil.svg";
import deleteIcon from "../../../images/red-x-button.svg";

export const SubmittedList = ({ currentUser }) => {
  const { openModal, closeModal } = useModals();

  // Determine the data query based on the user's admin status
  const queryVariables =
    currentUser.isAdmin && currentUser
      ? {
          where: {
            status: {
              equals: "draft",
            },
          },
        }
      : {
          where: {
            author: {
              id: {
                equals: currentUser.id,
              },
            },
            status: {
              equals: "draft",
            },
          },
        };

  // Use the query with the determined variables
  const { data, loading, error } = useQuery(GET_MOVIES, {
    variables: queryVariables,
  });

  const handleApproveClick = (movieData) => {
    openModal(
      <MoviePreviewModal
        closeModal={closeModal}
        whiteButton
        publishButtons
        selectedMovie={movieData}
      />
    );
  };

  function handleDeleteClick(movieData) {
    openModal(
      <DeleteMovieModal
        movieData={movieData}
        closeModal={closeModal}
        currentUser={currentUser}
      />
    );
  }

  return (
    <div className="w-fit h-fit">
      {!loading && (
        <div className="flex flex-col gap-y-5">
          {data?.movies.map((movie) => (
            <div
              className="h-fit w-[448px] border-b border-black-60 border-solid flex justify-between pb-5 xs:flex-col xs:items-center xs:gap-4"
              key={movie.id}
            >
              <MovieCard
                movieInfo={movie}
                size={movie.size}
                containerSize="small"
              />
              <div className="w-[204px] flex flex-col gap-y-5 xs:w-[224px]">
                <Button
                  variant="outline-secondary"
                  className="text-lg font-bold flex gap-2.5 h-10 w-51 w-full"
                  onClick={() => handleApproveClick(movie)}
                >
                  <img src={currentUser.isAdmin ? checkIcon : pencilIcon} />
                  {currentUser.isAdmin ? "Accept & Publish" : "Edit"}
                </Button>
                <Button
                  variant="outline-danger"
                  className="text-lg font-bold flex gap-2.5 h-[40px] w-full"
                  onClick={() => handleDeleteClick(movie)}
                >
                  <img src={deleteIcon} />
                  {currentUser.isAdmin ? "Deny & Delete" : "Delete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
