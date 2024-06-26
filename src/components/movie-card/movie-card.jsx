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

  // Functionality for opening movie preview modal
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

  // This provides random values to each movie size once on render for main route
  useEffect(() => {
    const randomColumnValue = getRandomColumns();
    setColumnSpan(randomColumnValue);
  }, []);

  // Sets the size of the container for image and subsection text
  const getContainerStyle = () => {
    switch (size) {
      case 1:
        return { maxWidth: "224px", maxHeight: "324px" };
      case 2:
        return { maxWidth: "468px", maxHeight: "694px" };
      case 3:
        return { maxWidth: "712px", maxHeight: "545px" };
      default:
        return {};
    }
  };

  // Sets the max sizes of the images
  const getImageStyle = () => {
    switch (size) {
      case 1:
        return { maxHeight: "190px" };
      case 2:
        return { maxHeight: "665px" };
      case 3:
        return { maxHeight: "518px" };
      default:
        return {};
    }
  };

  // Sets the classes for the card type being rendered
  const cardClasses = cx(
    "flex flex-col relative overflow-hidden",
    colSpanOne ? "col-span-1" : colSpanClass
  );

  // Ensures image covers the container
  const imageClasses = cx(
    "w-full object-cover ",
    containerSize === "small" &&
      "object-contain h-[120px] self-baseline xs:self-center"
  );

  // Sets style for titles of movies
  const titleClasses = cx(
    "text-lg font-bold font-arial leading-none hover:cursor-pointer",
    size === 1 && "mb-2.5 mt-2.5"
  );

  // Sets style for the runtime of movies
  const runtimeClasses = cx(
    "text-lg font-arial leading-none text-dark opacity-60 hover:cursor-pointer",
    size === 1 && "mb-2.5"
  );

  // Renders the html for the runtime, title, and year text
  const renderTitleAndRuntime = () => (
    <>
      <h2
        className={titleClasses}
        onClick={() => handleMovieClick()}
        style={{
          fontFamily: "Arial",
          fontSize: "18px",
          fontWeight: 700,
          lineHeight: "16.74px",
          letterSpacing: "-0.01em",
          textAlign: "left",
        }}
      >
        {card.title}
      </h2>
      {card.runtimeInMinutes && (
        <p
          className={runtimeClasses}
          onClick={() => handleMovieClick()}
          style={{
            fontFamily: "Arial",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "16.74px",
            letterSpacing: "-0.01em",
            textAlign: size >= 2 ? "right" : "left",
          }}
        >
          {card.releaseYear}, {card.runtimeInMinutes}
          {size === 1 ? " minutes" : ""}
        </p>
      )}
    </>
  );

  return (
    <div
      className={colSpanOne ? "col-span-1" : colSpanClass}
      style={getContainerStyle()}
    >
      <div
        className={cardClasses}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
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
        <div style={{ width: "100%", height: getImageStyle().maxHeight }}>
          <img
            className={imageClasses}
            src={!card.image ? purpleGoblin : card.image?.url}
            style={{ height: "100%" }}
            onClick={() => handleMovieClick()}
          />
        </div>
        {size >= 2 ? (
          <div
            className="flex flex-row col-span-2 justify-between hover:cursor-pointer mt-2.5"
            style={{ width: "100%" }}
            onClick={() => handleMovieClick()}
          >
            {renderTitleAndRuntime()}
          </div>
        ) : (
          renderTitleAndRuntime()
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
