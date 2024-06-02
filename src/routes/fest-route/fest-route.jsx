import { useMutation, useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useParams } from "react-router";
import { Button, Header, Loading, MovieCardList } from "../../components";
import { IdProtectedRoute } from "../../components/id-protected-route";
import { GET_FEST, GET_MOVIES } from "../../graphql/";
import { UPDATE_FEST } from "../../graphql/mutations/fest";
import { useCurrentUser, useModals } from "../../hooks";
import magGlassDark from "../../images/mag-glass-black.svg";
import { FestHeader, FestModal, FestSidebar } from "../fest-route";

export const FestRoute = () => {
  const { festId } = useParams();
  const { openModal, closeModal } = useModals();
  const { currentUser } = useCurrentUser();

  // Fest Query to pull fests from server
  const festQuery = useQuery(GET_FEST, {
    variables: { where: { id: festId } },
  });
  // an array of all attendees id's
  const attendeeIds = festQuery?.data?.fest?.attendees.map(
    (attendee) => attendee.id
  );
  // an array of all invitees id's
  const inviteeIds = festQuery?.data?.fest?.invitees.map(
    (attendee) => attendee.id
  );
  // attendees + invitees
  const allowedUserIds = attendeeIds?.concat(inviteeIds);

  // Movie Query
  const moviesQuery = useQuery(GET_MOVIES, { variables: { where: {} } });

  const [
    updateFest,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_FEST, { refetchQueries: [GET_FEST] });

  const addMovies = (movies) => {
    const movieIds = movies.map((movie) => {
      return { id: movie.id };
    });
    updateFest({
      variables: {
        where: { id: festId },
        data: { movies: { connect: movieIds } },
      },
    });
  };

  // Function to remove movies from server
  const removeMovie = (movieId) => {
    updateFest({
      variables: {
        where: { id: festId },
        data: { movies: { disconnect: [{ id: movieId }] } },
      },
    });
  };

  const movies = useMemo(() => {
    return festQuery.data?.fest?.movies.map((movie) => {
      return { ...movie, size: 1 };
    });
  }, [festQuery.data]);

  const recommendedMovies = useMemo(() => {
    const festMovieTitles = movies?.map((movie) => movie.title);
    return moviesQuery.data?.movies?.filter((movie) => {
      return !festMovieTitles?.includes(movie.title);
    });
  }, [moviesQuery.data, festQuery.data]);

  function openAddMovieModal() {
    openModal(
      <FestModal
        closeModal={closeModal}
        recommendedMovies={recommendedMovies}
        festId={festId}
        addMovies={addMovies}
        loading={updateLoading}
      />
    );
  }

  if (updateLoading) {
    return <Loading />;
  }

  return (
    <IdProtectedRoute
      allowedUserIds={allowedUserIds}
      allowedUserIdsLoading={festQuery.loading}
    >
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      {
        <div className="max-w-[1200px] my-0 mx-auto box-border">
          {!festQuery.loading && festQuery?.data?.fest && (
            <FestHeader fest={festQuery.data.fest} />
          )}
          <div className="flex gap-x-24">
            {!festQuery.loading && festQuery?.data?.fest && (
              <FestSidebar festQuery={festQuery} />
            )}
            <div className="w-full flex flex-col gap-y-8">
              <div className="flex justify-between items-center">
                {!festQuery.loading && movies && movies?.length > 0 && (
                  <h2 className="font-arial text-lg/4 font-bold">
                    Slops for this fest
                  </h2>
                )}
                {!festQuery.loading && movies && movies?.length === 0 && (
                  <h2 className="font-arial text-lg/4 font-bold">
                    {"No slops for this fest yet :("}
                  </h2>
                )}
                <Button
                  className="font-normal flex gap-x-2.5"
                  size="sm"
                  variant="outline-secondary"
                  onClick={openAddMovieModal}
                >
                  <img
                    className="w-5 h-5"
                    src={magGlassDark}
                    alt="black magnifying glass"
                  />
                  Search to add
                </Button>
              </div>
              {!festQuery.loading && (
                <MovieCardList
                  movies={movies}
                  colSpanOne
                  minusButton
                  minusButtonClick={removeMovie}
                />
              )}
              <span className="w-full border-b-[1px] border-gray" />
              {!moviesQuery.loading &&
                !festQuery.loading &&
                recommendedMovies?.length > 0 && (
                  <>
                    <h2 className="font-arial text-lg/4 font-bold">
                      Recommended Movies
                    </h2>
                    <MovieCardList
                      movies={recommendedMovies}
                      colSpanOne
                      plusButton
                      plusButtonClick={addMovies}
                    />
                  </>
                )}
              {!moviesQuery.loading &&
                !festQuery.loading &&
                recommendedMovies?.length === 0 && (
                  <h2 className="font-arial text-lg/4 font-bold">
                    {"No movies to recommend :("}
                  </h2>
                )}
            </div>
          </div>
        </div>
      }
    </IdProtectedRoute>
  );
};
