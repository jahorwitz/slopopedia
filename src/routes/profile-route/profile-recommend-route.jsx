import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Header, Loading, MovieCardList } from "../../components";
import { GET_MOVIES } from "../../graphql";
import { useCurrentUser } from "../../hooks";
import downArrow from "../../images/down-arrow.svg";
import eyeSvg from "../../images/eye.svg";
import upArrow from "../../images/up-arrow.svg";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

const options = [
  "Top 10 from wishlist",
  "Top 10 not in wishlist",
  "Top 10 watched",
  "Bottom 10 watched",
  "Top 10 easy (all-time)",
  "Bottom 10 easy (all-time)",
];

// DropDownList component

function DropDownList({ listSelection, setListSelection }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex gap-3">
        <div className="text-2xl font-bold border-b-2">
          {listSelection.toUpperCase()}
        </div>
        <button
          className="my-auto w-5 h-5 bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${isOpen ? upArrow : downArrow})` }}
          alt="arrow down"
          onClick={toggleDropdown}
        ></button>
      </div>

      {isOpen && (
        <div className="absolute border mt-2 w-full bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-2" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-lg font-semibold hover:bg-slate-200 cursor-pointer"
                onClick={() => {
                  setListSelection(option);
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
}

//Slop Preferences component
function SlopPreferences() {
  return (
    <div className="flex gap-4">
      <img className="w-6 h-6 my-auto" src={eyeSvg} alt="eye logo" />
      <button className="text-lg font-bold border-b-2 ">
        Slop Preferences
      </button>
    </div>
  );
}

// Function to get My Top watched Slops
const getTopSlops = (watchedMovies = []) => {
  return [...watchedMovies]
    .sort((a, b) => (b.tomatoScore || 0) - (a.tomatoScore || 0)) 
    .slice(0, 10); 
};

// Function to get My Bottom 10 watched Slops
const getBottomSlops = (watchedMovies = []) => {
  return [...watchedMovies] 
    .sort((a, b) => (a.tomatoScore || 0) - (b.tomatoScore || 0)) 
    .slice(0, 10); 
};

//Profile Recommend Route Component

export const ProfileRecommendRoute = () => {
  const { currentUser } = useCurrentUser();
  const [listSelection, setListSelection] = useState(options[0]);
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const { data, loading, error } = useQuery(GET_MOVIES, {
    variables: { where: {} }, 
  });

  // Extract watched movies from the currentUser data
  const watchedMovies = currentUser?.watched || [];
  
  console.log(watchedMovies);

  // Determine which movies to display based on list selection
  let displayedMovies = data?.movies || [];
  if (listSelection === "Top 10 watched") {
    displayedMovies = getTopSlops(watchedMovies);
  }
  if (listSelection === "Bottom 10 watched") {
    displayedMovies = getBottomSlops(watchedMovies);
  }

  return (
    <div className="">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <section className="flex flex-col h-[900px] bg-gray-background xl:flex-row">
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        <div className="w-[75%]">
          <div className="flex mt-10 justify-between w-full">
            <DropDownList
              listSelection={listSelection}
              setListSelection={setListSelection}
            />
            <SlopPreferences />
          </div>
          <div className="pt-10">
            {loading ? <Loading /> : <MovieCardList movies={displayedMovies} />}
          </div>
        </div>
      </section>
    </div>
  );
};
