import { movieInfo, sizes } from "../utils/constants";
import MovieCard from "./MovieCard";

function MovieCardList() {
  return <MovieCard movieInfo={movieInfo} size={sizes.small} className="" />;
}

export default MovieCardList;
