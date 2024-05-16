import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../graphql";
import { MovieContext } from "./movie-context";

// To utilize movie data in a component:
// import 'useMovies' to the component.
// const { movieData } = useMovies();

export const MovieContextProvider = ({ children }) => {
  const {
    data: movieData,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
  } = useQuery(GET_MOVIES, {
    variables: {
      where: {
        status: {
          equals: "published",
        },
      },
    },
  });

  return (
    <MovieContext.Provider
      value={{ movieData, moviesLoading, moviesError, refetchMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
};
