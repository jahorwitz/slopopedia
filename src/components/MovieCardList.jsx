import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../graphql/get-movies";
import MovieCard from "./MovieCard";

export const MovieCardList = () => {
  function Movies() {
    const { loading, error, data } = useQuery(GET_MOVIES);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
      <>
        {data.movies.map((movie) => (
          <MovieCard key={movie.id} movieInfo={movie} className={""} />
        ))}
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 gap-5">
        <Movies />
      </div>
    </>
  );
};

MovieCardList.displayName = "MovieCardList";
