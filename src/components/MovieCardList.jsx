import { dummyData, sizes } from "../utils/constants";
import MovieCard from "./MovieCard";

function getRandomSize() {
  const sizeKeys = Object.keys(sizes);
  const randomIdx = Math.floor(Math.random() * sizeKeys.length);
  return sizeKeys[randomIdx];
}

function MovieCardList() {
  return (
    <>
      {dummyData.map((movie, idx) => (
        <MovieCard
          key={idx}
          movieInfo={{ ...movie, size: getRandomSize() }}
          size={movie.size}
          className={""}
        />
      ))}
    </>
  );
}

export default MovieCardList;

MovieCardList.displayName = "MovieCardList";
