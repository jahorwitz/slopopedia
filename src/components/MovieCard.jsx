import Keyword from "./Keyword";

export function MovieCard({
  children,
  onClick,
  className,
  movieInfo,
  ...rest
}) {
  const size = Math.floor(Math.random() * 3) + 1;

  const card = {
    image: movieInfo.photo.url,
    title: movieInfo.title,
    keywords: movieInfo.keywords,
    releaseYear: movieInfo.releaseYear,
    runtime: movieInfo.runtime,
    rottenTomatoesScore: movieInfo.rottenTomatoesScore,
    howToWatch: movieInfo.howToWatch,
    decription: movieInfo.description,
    size: size,
  };

  return (
    <div
      className={
        "flex flex-col relative " +
        className +
        (card.size === 2
          ? "col-span-2"
          : card.size === 3
          ? " col-span-3"
          : "col-span-1")
      }
      onClick={onClick}
      {...rest}
    >
      <img className="mb-2.5 " src={card.image}></img>
      {/* title and year + runtime are beside each other if the size is equal or greater than two */}
      {card.size >= 2 ? (
        <div className="flex flex-row col-span-2 justify-between">
          <h2 className="text-movie-card-captions mb-2.5 font-bold font-arial">
            {card.title}
          </h2>
          <p className="text-movie-card-captions mb-2.5 text-gray-400 font-arial">
            {card.releaseYear}, {card.runtime}
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-movie-card-captions mb-2.5 font-bold font-arial">
            {card.title}
          </h2>
          {card.runtime && (
            <p className="text-movie-card-captions mb-2.5 text-gray-400 font-arial">
              {card.releaseYear}, {card.runtime}
            </p>
          )}
        </>
      )}

      {!!movieInfo.keywords && (
        <div
          className={
            "flex flex-wrap gap-2 " +
            (card.size === 1
              ? "flex flex-row relative col-span-1 justify-around"
              : "flex flex-row flex-wrap w-64") +
            (card.size >= 2
              ? "absolute top-2 left-2 max-w-[calc(100%-24px)]"
              : "w-full")
          }
        >
          {movieInfo.keywords.map((keyword) => (
            <Keyword
              keyword={keyword}
              className={
                card.size === 3 || card.size === 2
                  ? "bg-yellow-300 col-span-2"
                  : "h-31px space-x-2 space-y-2 bg-gray-button xs:space-x-2 xs:space-y-2"
              }
              key={keyword.id}
            />
          ))}
        </div>
      )}

      {children}
    </div>
  );
}

export default MovieCard;

MovieCard.displayName = "MovieCard";
