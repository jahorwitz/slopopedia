import cx from "classnames";
import { Button } from "../components";
import purpleGoblin from "../images/purple-goblin.png";
import { getRandomColumns } from "../utils/constants";
import { Keyword } from "./keyword";

export function MovieCard({
  children,
  size,
  onClick,
  className,
  movieInfo,
  colSpanOne,
  minusButton,
  plusButton,
  minusButtonClick,
  plusButtonClick,
  showEditButton,
  onEdit,
  ...rest
}) {
  const card = {
    image: movieInfo.photo,
    title: movieInfo.title,
    keywords: movieInfo.keywords,
    releaseYear: movieInfo.releaseYear,
    runtimeInMinutes: movieInfo.runtime,
    rottenTomatoesScore: movieInfo.rottenTomatoesScore,
    howToWatch: movieInfo.howToWatch,
    decription: movieInfo.description,
  };

  return (
    <div className={colSpanOne ? "col-span-1" : getRandomColumns()}>
      <div
        // Parent div is relative to allow for elements and children to be positioned absolutely
        className={
          cx(
            "flex flex-col relative",
            size === 1 && "col-span-1",
            size === 2 && "col-span-2",
            size === 3 && "col-span-3",
            className
          )
          // +
          // className +
          // // (size == 1 && "col-span-1 ") +
          // (size >= 2 && (size === 2 ? " col-span-2" : " col-span-3"))
        }
        onClick={onClick}
        {...rest}
      >
        {/* Place the Edit button at the top-right corner of the card */}
        {showEditButton && (
          <Button
            variant="outline-secondary" // Or any other appropriate variant
            className="absolute top-0 right-0 m-2"
            onClick={() => onEdit(movieInfo.id)}
          >
            Edit
          </Button>
        )}

        {minusButton && (
          <Button
            variant="minus"
            onClick={() => {
              minusButtonClick(movieInfo.id);
            }}
          />
        )}
        {plusButton && (
          <Button
            variant="plus"
            onClick={() => {
              plusButtonClick([movieInfo]);
            }}
          />
        )}
        <img
          className="mb-2.5 "
          src={card.image === null ? purpleGoblin : card.image.url}
        ></img>
        {/* title and year + runtime are beside each other if the size is equal or greater than two */}
        {size >= 2 ? (
          <div className="flex flex-row col-span-2 justify-between">
            <h2 className="text-lg mb-2.5 font-bold font-arial">
              {card.title}
            </h2>
            <p className="text-lg mb-2.5 text-gray-400 font-arial">
              {card.releaseYear}, {card.runtimeInMinutes}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-lg mb-2.5 font-bold font-arial">
              {card.title}
            </h2>
            {card.runtimeInMinutes && (
              <p className="text-lg mb-2.5 text-gray-400 font-arial">
                {card.releaseYear}, {card.runtimeInMinutes} minutes
              </p>
            )}
          </>
        )}
        {!!card.keywords && (
          <div
            // Keywords are positioned absolutely on the image of the card if the size is equal or equal to two
            className={
              "flex flex-wrap gap-2 " +
              (size === 1
                ? "flex flex-row relative col-span-1 justify-around"
                : "flex flex-row flex-wrap w-64") +
              (size >= 2
                ? "absolute top-2 left-2 max-w-[calc(100%-24px)]"
                : "w-full")
            }
          >
            {card.keywords.map((keyword, index) => (
              <Keyword
                keyword={keyword.name}
                className={
                  size >= 2
                    ? "bg-yellow col-span-2"
                    : "h-31px space-x-2 space-y-2 bg-gray xs:space-x-2 xs:space-y-2"
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
