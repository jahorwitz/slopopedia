import { getRandomColumns } from "../utils/constants";
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
    <div className={getRandomColumns()}>
      <div
        // Parent div is relative to allow for elements and children to be positioned absolutely
        className={
          "flex flex-col relative " +
          className +
          (size === 1 && "col-span-1 ") +
          (size >= 2 && (size === 2 ? " col-span-2" : " col-span-3"))
        }
        onClick={onClick}
        {...rest}
      >
        <img className="mb-2.5 " src={card.image}></img>
        {/* title and year + runtime are beside each other if the size is equal or greater than two */}
        {size >= 2 ? (
          <div className="flex flex-row col-span-2 justify-between">
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
            // Keywords are positioned absolutely on the image of the card if the size is equal or equal to two
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
                    ? "bg-yellow-300 col-span-2"
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
    </div>
  );
}

export default MovieCard;

MovieCard.displayName = "MovieCard";
