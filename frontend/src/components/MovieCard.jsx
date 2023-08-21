import Keyword from "./Keyword";

export function MovieCard({
  children,
  size,
  onClick,
  className,
  movieInfo,
  ...rest
}) {
  const card = {
    image: movieInfo.image,
    title: movieInfo.title,
    keywords: movieInfo.keywords,
    releaseYear: movieInfo.releaseYear,
    runtimeInMinutes: movieInfo.runtimeInMinutes,
    rottenTomatoesScore: movieInfo.rottenTomatoesScore,
    howToWatch: movieInfo.howToWatch,
    decription: movieInfo.description,
  };

  return (
    <div
      className={
        "flex flex-col relative " +
        className +
        (size === 1 && "max-w-sm-card ") +
        (size >= 2 && (size === 2 ? " max-w-md-card" : " max-w-lg-card"))
      }
      onClick={onClick}
      {...rest}
    >
      <img className="mb-2.5 " src={card.image}></img>
      {size >= 2 ? (
        <div className="flex flex-row justify-between">
          <h2 className="text-movie-card-captions mb-2.5 font-bold font-arial">
            {card.title}
          </h2>
          <p className="text-movie-card-captions mb-2.5 text-gray-400 font-arial">
            {card.releaseYear}, {card.runtimeInMinutes}
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-movie-card-captions mb-2.5 font-bold font-arial">
            {card.title}
          </h2>
          {card.runtimeInMinutes && (
            <p className="text-movie-card-captions mb-2.5 text-gray-400 font-arial">
              {card.releaseYear}, {card.runtimeInMinutes}
            </p>
          )}
        </>
      )}
      {!!card.keywords && (
        <div
          className={
            "flex flex-wrap gap-2 " +
            (size >= 2
              ? "absolute top-2 left-2 max-w-[calc(100%-24px)]"
              : "w-full")
          }
        >
          {card.keywords.map((keyword, index) => (
            <Keyword
              keyword={keyword}
              className={
                size >= 2
                  ? "bg-yellow-300"
                  : "h-31px space-x-2 space-y-2 bg-gray-button"
              }
              index={index}
              key={index}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

export default MovieCard;
