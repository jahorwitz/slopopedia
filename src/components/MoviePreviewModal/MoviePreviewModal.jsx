import { useState } from "react";
import styled from "styled-components";
import camera from "../../images/camera.svg";
import checkMarkDark from "../../images/check-mark-dark.svg";
import heartDark from "../../images/heart-dark.svg";
import rottenTomato from "../../images/rotten-tomatoes.svg";
import { Badge } from "../badge";
import { Button } from "../button";
import { Keyword } from "../keyword";
import { Modal } from "../modal";

const BlurredImage = styled.div`
  background: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .blur {
    height: 100%;
    width: 100%;
    backdrop-filter: blur(10px);
    position: absolute;
    z-index: 0;
  }
`;

export const MoviePreviewModal = ({
  whiteButton,
  buttons,
  howToWatch,
  selectedMovie,
}) => {
  const [isWatchedClicked, setIsWatchedClicked] = useState(false);
  const [isWantClicked, setIsWantClicked] = useState(false);

  const handleWatchedClick = () => {
    setIsWatchedClicked(!isWatchedClicked);
  };

  const handleWantClick = () => {
    setIsWantClicked(!isWantClicked);
  };

  const movie = {
    photo: selectedMovie.photo.url,
    title: selectedMovie.title,
    releaseYear: selectedMovie.releaseYear,
    runtime: selectedMovie.runtime,
    description: selectedMovie.description,
    keywords: selectedMovie.keywords,
    tomatoScore: selectedMovie.tomatoScore,
    howToWatch: selectedMovie.howToWatch,
  };

  return (
    <Modal whiteButton={whiteButton}>
      <BlurredImage image={movie.photo}>
        {buttons && (
          <Badge
            text="You'll like this!"
            className="absolute top-[55px] left-[20px] z-50 text-lg/5 font-arial"
          />
        )}

        <div className="blur"></div>
        <img
          src={movie.photo}
          alt={movie.title}
          className="mx-auto my-0 py-2.5 z-50 max-h-80"
        />
      </BlurredImage>
      <div className="max-w-[620px] pl-[60px] pt-5 pb-[60px] flex flex-col gap-y-5 font-arial">
        <div className="flex flex-col gap-y-2.5 text-lg">
          <h1 className="font-bold ">{movie.title}</h1>
          <p>
            {movie.releaseYear}, {movie.runtime} minutes
          </p>
        </div>
        <div>
          <p className="text-lg/5">{movie.description}</p>
        </div>
        <div className="flex gap-x-2">
          {movie.keywords.map((keyword, index) => (
            <Keyword
              className={"bg-yellow"}
              key={index}
              keyword={keyword.name}
            />
          ))}
        </div>
        <div className="flex gap-x-2.5">
          <img src={rottenTomato} alt={"rotten tomato"} className="w-5 h-5" />
          <p className="text-lg/5">
            Rotten Tomatoes score: {movie.tomatoScore}%
          </p>
        </div>
        {howToWatch && (
          <div className="flex gap-x-2.5">
            <img src={camera} alt={"camera"} className="w-5 h-5" />
            <p className="text-lg/5">Watch on: {movie.howToWatch}</p>
          </div>
        )}
        {buttons && (
          <div className="flex gap-x-5 mt-10 font-bold text-lg/4">
            <Button
              variant={isWatchedClicked ? "primary" : "outline-secondary"}
              className="flex items-center gap-x-2.5 border border-solid border-black p-2.5"
              onClick={handleWatchedClick}
            >
              <img src={checkMarkDark} className="w-4 h-3" />I watched it!
            </Button>
            <Button
              size="sm"
              variant={isWantClicked ? "primary" : "outline-secondary"}
              className="flex items-center gap-x-2.5 border border-solid border-black p-2.5"
              onClick={handleWantClick}
            >
              <img src={heartDark} className="w-4 h-3" />I want it!
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};