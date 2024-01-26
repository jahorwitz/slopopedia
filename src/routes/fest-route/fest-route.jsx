import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { Button, Header, Loading, MovieCardList } from "../../components";
import { DELETE_FEST, GET_FEST, GET_MOVIES, UPDATE_FEST } from "../../graphql/";
import magGlassDark from "../../images/mag-glass-black.svg";
import { useModals } from "../../store";
import { FestHeader, FestModal, FestSidebar } from "../fest-route";

export const FestRoute = () => {
  const { festId } = useParams();
  const { openModal, closeModal, registerModal } = useModals();

  const festQuery = useQuery(GET_FEST, {
    variables: {
      where: {
        id: festId,
      },
    },
  });

  const moviesQuery = useQuery(GET_MOVIES, { variables: { where: {} } });

  const [deleteFest, { data, loading, error }] = useMutation(DELETE_FEST, {
    refetchQueries: [GET_FEST],
  });

  const removeFest = () => {
    deleteFest({
      variables: { where: [{ id: festId }] },
    });
  };

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
        data: {
          movies: {
            connect: movieIds,
          },
        },
      },
    });
  };

  const removeMovie = (movieId) => {
    updateFest({
      variables: {
        where: { id: festId },
        data: {
          movies: {
            disconnect: [{ id: movieId }],
          },
        },
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

  useEffect(() => {
    registerModal(
      "add movie",
      <FestModal
        closeModal={closeModal}
        recommendedMovies={recommendedMovies}
        festId={festId}
        addMovies={addMovies}
        loading={updateLoading}
      />
    );
  }, [recommendedMovies]);

  if (updateLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className=" max-w-[1200px] my-0 mx-auto box-border">
        {!festQuery.loading && <FestHeader fest={festQuery.data.fest} />}
        <div className="flex gap-x-28">
          <FestSidebar removeFest={removeFest} />
          <div className="flex flex-col gap-y-8">
            <div className="flex justify-between items-center">
              {!festQuery.loading && movies.length > 0 && (
                <h2 className="font-arial text-lg/4 font-bold">
                  Slops for this fest
                </h2>
              )}
              {!festQuery.loading && movies.length === 0 && (
                <h2 className="font-arial text-lg/4 font-bold">
                  {"No slops for this fest yet :("}
                </h2>
              )}
              <Button
                className="font-normal flex gap-x-2.5"
                size="sm"
                variant="outline-secondary"
                onClick={() => {
                  openModal("add movie");
                }}
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
              recommendedMovies.length > 0 && (
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
              recommendedMovies.length === 0 && (
                <h2 className="font-arial text-lg/4 font-bold">
                  {"No movies to recommend :("}
                </h2>
              )}
          </div>
        </div>
      </div>
    </>
  );
};
