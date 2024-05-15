import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../graphql";
import { MovieContext } from "./movie-context";

export const MovieContextProvider = ({ children }) => {
  const {
    data: movieData,
    loading: moviesLoading,
    error: moviesError,
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
    <MovieContext.Provider value={{ movieData, moviesLoading, moviesError }}>
      {children}
    </MovieContext.Provider>
  );
};
