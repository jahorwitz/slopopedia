import { dummyData } from "../utils/constants";
import MovieCard from "./MovieCard";

function MovieCardList() {
  return (
    <>
      <div className="grid grid-cols-5 md:grid-cols-3 gap-3">
        {dummyData.map((movie, idx) => (
          <MovieCard
            key={idx}
            movieInfo={movie}
            size={movie.size}
            className={""}
          />
        ))}
      </div>
    </>
  );
}

export default MovieCardList;

MovieCardList.displayName = "MovieCardList";
