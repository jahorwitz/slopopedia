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
}) => {
  // hooks for pagination mechanism
  const [movies, setMovies] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // runs on initial page load grabbing first ten movies
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
    onCompleted: (data) => {
      setMovies(data.movies);
    },
  });

  const loadMoreMovies = () => {
    if (!hasMore) return;

    fetchMore({
      variables: {
        skip: movies.length,
        take: moviesPerPage,
      },
    }).then((fetchMoreResult) => {
      // if no more movies to fetch, set hasMore to false
      if (fetchMoreResult.data.movies.length < moviesPerPage) {
        setHasMore(false);
      }
      // create new array combining previous movies and
      // movies just fetched
      setMovies((prevMovies) => [
        ...prevMovies,
        ...fetchMoreResult.data.movies,
      ]);
      setSkip((prevSkip) => prevSkip + moviesPerPage);
    });
  };

  useEffect(() => {
    if (movieData) {
      setMovies(movieData.movies);
    }
  }, [movieData]);

  const handleScroll = () => {
    if (
      // checks to see if user has reached the bottom of the page
      // if so, load more movies
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreMovies();
    } else {
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [movies]);

  if (moviesLoading) return <p className="text-dark arialBold">Loading...</p>;
  if (moviesError) return <p>Error loading movies: {moviesError.message}</p>;

  return (
    <>
      <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 gap-5">
        {movies?.map((movie) => (
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
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center items-center mt-5 mb-5 mx-auto">
          <button
            className="bg-dark arialBold text-white font-bold py-2 px-4 rounded z-99 cursor-pointer"
            onClick={loadMoreMovies}
          >
            Load More Movies
          </button>
        </div>
      )}
    </>
  );
};

MovieCardList.displayName = "MovieCardList";
