import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_PAGINATED_MOVIES } from "../graphql/get-movies";
import MovieCard from "./movie-card/movie-card";

const moviesPerPage = 10;

export const MovieCardList = ({
  className,
  colSpanOne,
  minusButton,
  plusButton,
  minusButtonClick,
  plusButtonClick,
  propMovies,
}) => {
  // hooks for pagination mechanism
  const [movies, setMovies] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: movieData,
    loading: moviesLoading,
    error: moviesError,
    fetchMore,
  } = useQuery(GET_PAGINATED_MOVIES, {
    variables: {
      take: moviesPerPage,
      skip: 0,
      where: {
        status: {
          equals: "published",
        },
      },
    },
    // if rendering props from search route, skip query
    skip: !!propMovies,
    onCompleted: (data) => {
      setMovies(data.movies);
    },
  });

  const loadMoreMovies = () => {
    if (!hasMore || propMovies) return;

    fetchMore({
      variables: {
        skip: movies.length,
        take: moviesPerPage,
      },
    }).then((fetchMoreResult) => {
      if (fetchMoreResult.data.movies.length < moviesPerPage) {
        setHasMore(false);
      }
      setMovies((prevMovies) => [
        ...prevMovies,
        ...fetchMoreResult.data.movies,
      ]);
      setSkip((prevSkip) => prevSkip + moviesPerPage);
    });
  };

  useEffect(() => {
    if (movieData && !propMovies) {
      setMovies(movieData.movies);
    } else if (propMovies) {
      setMovies(propMovies);
    }
  }, [movieData, propMovies]);

  const handleScroll = () => {
    if (propMovies) {
      return;
    }
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 20
    ) {
      loadMoreMovies();
    }
  };

  useEffect(() => {
    if (!propMovies) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [movies, propMovies]);

  if (moviesLoading)
    return <p className="text-dark arialBold">Loading More Movies ...</p>;
  if (moviesError) return <p>Error loading movies: {moviesError.message}</p>;

  const movieIds = movies.map((movie) => movie.id);
  const uniqueMovieIds = new Set(movieIds);

  return (
    <div className="grid gap-y-5 gap-x-2.5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-3 gap-5">
      {Array.from(uniqueMovieIds).map((id) => {
        const movie = movies?.find((movie) => movie.id === id);
        return (
          <MovieCard
            key={movie.id}
            movieInfo={movie}
            className={className}
            colSpanOne={colSpanOne}
            minusButton={minusButton}
            plusButton={plusButton}
            minusButtonClick={minusButtonClick}
            plusButtonClick={plusButtonClick}
          />
        );
      })}
    </div>
  );
};

MovieCardList.displayName = "MovieCardList";
