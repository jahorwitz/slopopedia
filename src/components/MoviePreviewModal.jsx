import { useState } from "react";
import styled from "styled-components";
import camera from "../images/camera.svg";
import checkMarkDark from "../images/check-mark-dark.svg";
import drCal from "../images/drcaligari.png";
import heartDark from "../images/heart-dark.svg";
import rottenTomato from "../images/rotten-tomatoes.svg";
import { Button } from "./Button/Button";
import { Image } from "./Image/Image";
import Keyword from "./Keyword";
import { Modal } from "./Modal";
import { RecommendBadge } from "./RecommendBadge";

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

export const MoviePreviewModal = ({ closeModal, route }) => {
  const [isWatchedClicked, setIsWatchedClicked] = useState(false);
  const [isWantClicked, setIsWantClicked] = useState(false);

  const handleWatchedClick = () => {
    setIsWatchedClicked(!isWatchedClicked);
  };

  const handleWantClick = () => {
    setIsWantClicked(!isWantClicked);
  };

  const movie = {
    photo: drCal,
    title: "Dr. Caligari",
    releaseYear: 1989,
    runtime: 80,
    description:
      'A 1989 softcore sequel to the 1920 German expressionist silent film. The L.A. Times sez: "One of the kinkiest artifacts ever to come out of Orange County."',
    keywords: ["Auteur", "Campy", "Homoerotic Undertones", "Low Budget"],
    tomatoScore: 56,
    howToWatch: ["Netflix"],
  };

  return (
    <Modal closeModal={closeModal}>
      {/* movie.photo. should be blurred */}
      <BlurredImage image={movie.photo}>
        {route === "fests" && (
          <RecommendBadge
            text="You'll like this!"
            className="absolute top-[55px] left-[20px] z-50 text-lg/5 font-arial"
          />
        )}

        <div className="blur"></div>
        <Image
          src={movie.photo}
          alt={movie.title}
          className="mx-auto my-0 py-2.5 z-50"
        />
      </BlurredImage>
      {/* all information about movie */}
      <div className="max-w-[590px] pl-[60px] pt-5 pb-[60px] flex flex-col gap-y-5 font-arial">
        <div className="flex flex-col gap-y-2.5 text-movie-card-captions">
          {/* movie.title, movie.releaseYear, movie.runtime */}
          <h1 className="font-bold ">{movie.title}</h1>
          <p>
            {movie.releaseYear}, {movie.runtime} minutes
          </p>
        </div>
        <div>
          {/* movie.description */}
          <p className="text-lg/5">{movie.description}</p>
        </div>
        <div className="flex gap-x-2">
          {/* movie.keywords */}
          {movie.keywords.map((keyword, index) => (
            <Keyword
              className={"bg-yellow-300"}
              key={index}
              keyword={keyword}
            />
          ))}
        </div>
        <div className="flex gap-x-2.5">
          {/* movie.tomatoScore */}
          <Image src={rottenTomato} alt={"rotten tomato"} className="w-5 h-5" />
          <p className="text-lg/5">
            Rotten Tomatoes score: {movie.tomatoScore}%
          </p>
        </div>
        <div className="flex gap-x-2.5">
          {/* movie.howToWatch */}
          <Image src={camera} alt={"camera"} className="w-5 h-5" />
          <p className="text-lg/5">Watch on: </p>
          {movie.howToWatch.map((method, index) => (
            <p className="text-lg/5" key={index}>
              {method}
            </p>
          ))}
        </div>
        {route === "fests" && (
          <div className="flex gap-x-5 mt-10 font-bold text-lg/4">
            <Button
              title="I watched it!"
              className={`flex items-center gap-x-2.5 border border-solid border-black p-2.5 ${
                isWatchedClicked ? "bg-yellow-button" : ""
              }`}
              onClick={handleWatchedClick}
            >
              <Image src={checkMarkDark} className="w-4 h-3" />
            </Button>
            <Button
              title="I want it!"
              className={`flex items-center gap-x-2.5 border border-solid border-black p-2.5 active:bg-yellow-button ${
                isWantClicked ? "bg-yellow-button" : ""
              }`}
              onClick={handleWantClick}
            >
              <Image src={heartDark} className="w-4 h-3" />
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};