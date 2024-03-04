import MovieCard from "./MovieCard";

export const MovieCardList = ({
  movies,
  className,
  colSpanOne,
  minusButton,
  plusButton,
  minusButtonClick,
  plusButtonClick,
  renderButton,
}) => {
  return (
    <>
      <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 gap-5">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movieInfo={movie}
            size={movie.size}
            className={className}
            colSpanOne={colSpanOne}
            minusButton={minusButton}
            plusButton={plusButton}
            minusButtonClick={minusButtonClick}
            plusButtonClick={plusButtonClick}
            renderButton={renderButton}
          />
        ))}
      </div>
    </>
  );
};

MovieCardList.displayName = "MovieCardList";
