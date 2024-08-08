import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Header } from "../../components";
import { useCurrentUser } from "../../hooks";
import downArrow from "../../images/down-arrow.svg";
import eyeSvg from "../../images/eye.svg";
import upArrow from "../../images/up-arrow.svg";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

const options = [
  "Top 10 wishlist",
  "Top 10 not in wishlist",
  "Top 10 watched",
  "Bottom 10 watched",
  "Top 10 easy(all-time)",
  "Bottom 10 easy(all-time)",
];

const DropDownList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex gap-3">
        <div className="text-2xl font-bold border-b-2">
          TOP 10 FROM WISHLIST
        </div>
        <button
          className="my-auto w-5 h-5 bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${isOpen ? upArrow : downArrow})` }}
          alt="arrow down"
          onClick={toggleDropdown}
        ></button>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-sm font-semibold  hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  console.log(`Selected: ${option}`);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SlopPreferences = () => {
  return (
    <div className="flex gap-4">
      <img className="w-6 h-6 my-auto" src={eyeSvg} alt="eye logo" />
      <button className="text-lg font-bold border-b-2 ">
        Slop Preferences
      </button>
    </div>
  );
};

export const ProfileRecommendRoute = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const userId = currentUser.id;
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div className="">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <section className="flex h-[900px] bg-gray-background">
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        <div className="w-[75%]">
          <div className="flex mt-10 justify-between w-full">
            <DropDownList />
            <SlopPreferences />
          </div>
          <div className="pt-10">display images grid</div>
        </div>
      </section>
    </div>
  );
};
