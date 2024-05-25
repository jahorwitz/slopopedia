import cx from "classnames";
import { useEffect, useState } from "react";
import { Button } from "..";
import { useModals } from "../../hooks";
import purpleGoblin from "../../images/purple-goblin.png";
import { getRandomColumns } from "../../utils/constants";
import { Keyword } from "../keyword";
import { MoviePreviewModal } from "../movie-preview-modal";

export function MovieCard({
  children,
  onClick,
  movieInfo,
  colSpanOne,
  minusButton,
  plusButton,
  minusButtonClick,
  plusButtonClick,
  containerSize = "full",
  ...rest
}) {
  const [colSpan, setColSpan] = useState({ class: "col-span-1", size: 1 });
  useEffect(() => {
    setColSpan(getRandomColumns());
  }, []);

  const { class: colSpanClass, size } = colSpan;

  const card = {
    image: movieInfo?.photo,
    title: movieInfo?.title,
    keywords: movieInfo?.keywords || [],
    releaseYear: movieInfo?.releaseYear,
    runtimeInMinutes: movieInfo?.runtime,
    rottenTomatoesScore: movieInfo?.rottenTomatoesScore,
    howToWatch: movieInfo?.howToWatch,
    description: movieInfo?.description,
  };

  //functionality for opening movie preview modal
  const { closeModal, openModal } = useModals();
  const [columnSpan, setColumnSpan] = useState(null);

  const handleMovieClick = () => {
    openModal(
      <MoviePreviewModal
        closeModal={closeModal}
        userButtons
        whiteButton
        selectedMovie={movieInfo}
      />
    );
  };

  //this provides random values to each movie size once on render for main route
  useEffect(() => {
    const randomColumnValue = getRandomColumns();
    setColumnSpan(randomColumnValue);
  }, []);

  return (
    <div className={colSpanOne ? "col-span-1" : colSpanClass}>
      <div
        // Parent div is relative to allow for elements and children to be positioned absolutely
        className={cx(
          "flex flex-col relative",
          size === 1 && "col-span-1",
          size === 2 && "col-span-2",
          size === 3 && "col-span-3"
        )}
        style={{ position: "relative" }}
        onClick={onClick}
        {...rest}
      >
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
          className={cx(
            "mb-2.5 max-h-[80vh] overflow-hidden hover:cursor-pointer",
            containerSize === "small" &&
              "object-contain h-[120px] self-baseline xs:self-center"
          )}
          src={!card.image ? purpleGoblin : card.image?.url}
          onClick={() => handleMovieClick()}
        />
        {/* title and year + runtime are beside each other if the size is equal or greater than two */}
        {size >= 2 ? (
          <div
            className="flex flex-row col-span-2 justify-between hover:cursor-pointer"
            onClick={() => handleMovieClick()}
          >
            <h2 className="text-lg mb-2.5 font-bold font-arial">
              {card.title}
            </h2>
            <p className="text-lg mb-2.5 text-gray-400 font-arial">
              {card.releaseYear}, {card.runtimeInMinutes}
            </p>
          </div>
        ) : (
          <>
            <h2
              className="text-lg mb-2.5 font-bold font-arial leading-none hover:cursor-pointer"
              onClick={() => handleMovieClick()}
            >
              {card.title}
            </h2>
            {card.runtimeInMinutes && (
              <p
                className="text-lg mb-2.5 font-arial leading-none text-dark opacity-60 hover:cursor-pointer"
                onClick={() => handleMovieClick()}
              >
                {card.releaseYear}, {card.runtimeInMinutes} minutes
              </p>
            )}
          </>
        )}
        {card.keywords && (
          <div
            // Keywords are positioned absolutely on the image of the card if the size is equal or equal to two
            className={
              "flex flex-wrap gap-2 " +
              (size === 1
                ? "flex flex-row relative col-span-1 justify-around "
                : "flex flex-row flex-wrap w-64 ") +
              (size >= 2
                ? "absolute top-2 left-2 max-w-[calc(100%-24px)] "
                : "w-full ") +
              (containerSize === "small" && "xs:justify-center")
            }
          >
            {card.keywords.slice(0, 5).map((keyword, index) => (
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
