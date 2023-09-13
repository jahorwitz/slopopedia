import { dummyData } from "../utils/constants";
import MovieCard from "./MovieCard";

function MovieCardList() {
  return (
    <>
      {dummyData.map((movie) => (
        <MovieCard movieInfo={movie} size={movie.size} className={""} />
      ))}
    </>
  );
}

export default MovieCardList;

MovieCardList.displayName = "MovieCardList";
