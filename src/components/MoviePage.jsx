import { useState } from "react";
import { NavLink } from "react-bootstrap";
import styled from "styled-components";
import checkMarkDark from "../images/check-mark-dark.svg";
import checkMark from "../images/check-mark.svg";
import DrCaligari from "../images/drcaligari.png";
import heartDark from "../images/heart-dark.svg";
import heart from "../images/heart.svg";
import rottenTomato from "../images/rotten-tomatoes.svg";
import { Badge } from "./badge";

export function MoviePage() {
  const BlurredImage = styled.div`
    background: url(${(props) => props.image});
    background-repeat: no-repeat;
    background-size: cover;
    height: 320px;
    position: relative;
    width: 100%;
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
  const [isWatchedClicked, setIsWatchedClicked] = useState(false);
  const [isWantClicked, setIsWantClicked] = useState(false);

  const handleWatchedClick = () => {
    if (isWatchedClicked !== true) {
      setIsWatchedClicked(true);
    } else {
      setIsWatchedClicked(false);
    }
  };

  const handleWantClick = () => {
    if (isWantClicked !== true) {
      setIsWantClicked(true);
    } else {
      setIsWantClicked(false);
    }
  };

  return (
    <>
      {/* TOP OF PAGE */}
      {/* BlurredImage will be taken from API when movie is clicked (add the logic to determine image into image and src slots) */}
      <BlurredImage image={DrCaligari}>
        <div className="blur"></div>
        <img
          src={DrCaligari}
          alt="Dr Caligari"
          className="mt-[10px] mb-[10px] z-50"
        />
        {/* Left middle has recommended badge */}
        {/* will be determined by preferences and the positioning will change (see badges.stories.jsx for values) */}
        <Badge
          text="You'll like this!"
          className="absolute top-[55px] left-[88px] z-50"
        />
        {/* Left bottom corner has title, year it came out, length of movie(minutes) (taken from API) */}
        <div className="flex justify-between">
          <div className="border border-solid border-black absolute bottom-[20px] left-[20px] z-50">
            <h2 className="text-white">Dr. Caligari</h2>
            <p className="text-white">1989, 80 minutes</p>
          </div>
          <div className="absolute bottom-[20px] right-[20px] flex gap-2 z-50">
            {/* Right bottom corner has button for watched and button for want to watch (replace with logic for adding to watchlist/watched list) */}
            <button
              className={
                isWatchedClicked
                  ? "flex justify-center items-center bg-[#FFD913] text-black w-[148px] h-[40px]"
                  : "flex justify-center items-center border border-solid text-white w-[148px] h-[40px]"
              }
              onClick={handleWatchedClick}
            >
              <img
                src={isWatchedClicked ? checkMarkDark : checkMark}
                className="mr-2.5"
              />
              I watched it!
            </button>
            <button
              className={
                isWantClicked
                  ? "flex justify-center items-center bg-[#FFD913] text-black w-[118px] h-[40px]"
                  : "flex justify-center items-center border border-solid text-white w-[118px] h-[40px]"
              }
              onClick={handleWantClick}
            >
              <img src={isWantClicked ? heartDark : heart} className="mr-2.5" />
              I want it!
            </button>
          </div>
        </div>
      </BlurredImage>

      {/* MIDDLE OF PAGE */}
      <div className="flex flex-col items-center text-center mt-10">
        {/* Short description of movie(pulled from API) centered on screen */}
        <p className="font-arialRegular text-start text-lg w-[560px] h-[72px]">
          A 1989 softcore sequel to the 1920 German expressionist silent film.
          The L.A. Times sez: "One of the kinkiest artifacts to come out of
          Orange County"
        </p>

        <div className="flex justify-start mt-5 w-[560px]">
          {/* keywords called from api for selected movie */}
          {/* Keywords placed into array from API and mapped to create correct number of keywords for movie */}
          <NavLink to="/search" className="decoration-none">
            <button className="font-arialRegular bg-[#ffd913] pt-2 pl-[7px] pb-2 pr-[7px] mr-[8px]">
              Auteur
            </button>
          </NavLink>
          <NavLink to="/search" className="decoration-none">
            <button className="font-arialRegular bg-[#ffd913] pt-2 pl-[7px] pb-2 pr-[7px] mr-[8px]">
              Campy
            </button>
          </NavLink>
          <NavLink to="/search" className="decoration-none">
            <button className="font-arialRegular bg-[#ffd913] pt-2 pl-[7px] pb-2 pr-[7px] mr-[8px]">
              Homoerotic Undertones
            </button>
          </NavLink>
          <NavLink to="/search" className="decoration-none">
            <button className="font-arialRegular bg-[#ffd913] pt-2 pl-[7px] pb-2 pr-[7px]">
              Low Budget
            </button>
          </NavLink>
        </div>
        <div className="mt-5 w-[560px]">
          <p className="flex font-arialRegular text-lg">
            <img src={rottenTomato} className="mr-2.5" />
            Rotten Tomatoes: 56%
            {/* Rotten tomatoes score to be added from API (User submited) */}
          </p>
        </div>
      </div>
    </>
  );
}
