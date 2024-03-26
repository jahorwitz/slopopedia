import MovieCard from "./movie-card/movie-card";

export const MovieCardList = ({
  movies,
  className,
  colSpanOne,
  minusButton,
  plusButton,
  minusButtonClick,
  plusButtonClick,
}) => {
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
    </>
  );
};

MovieCardList.displayName = "MovieCardList";
