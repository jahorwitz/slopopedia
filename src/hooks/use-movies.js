import { useContext } from "react";
import { MovieContext } from "../store/movie-context";

export const useMovies = () => useContext(MovieContext);
