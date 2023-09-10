import { movieInfo, sizes } from "../utils/constants";
import MovieCard from "./MovieCard";

// MovieCardList is only here to show how props are to be used to
function MovieCardList() {
  return (
    <>
      <MovieCard movieInfo={movieInfo} size={sizes.large} className="" />
      <MovieCard movieInfo={movieInfo} size={sizes.small} className="" />
      <MovieCard movieInfo={movieInfo} size={sizes.small} className="" />
      <MovieCard movieInfo={movieInfo} size={sizes.small} className="" />
      <MovieCard movieInfo={movieInfo} size={sizes.small} className="" />
      <MovieCard movieInfo={movieInfo} size={sizes.small} className="" />
      <MovieCard movieInfo={movieInfo} size={sizes.medium} className="" />
    </>
  );
}

export default MovieCardList;
